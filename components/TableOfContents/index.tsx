'use client';

import { useState, useEffect, useRef } from 'react';
import { clsx } from 'clsx';

import Link from '@/components/mdxcomponents/Link'

// 辅助函数：将标题文本转换为有效的选择器
const createValidSelector = (url: string) => {
  // 移除URL中的数字后缀和#号前缀
  const cleanUrl = url.replace(/-\d+$/, '').replace(/^#/, '');
  // 对特殊字符进行编码，确保与 rehypeSlug 生成的ID格式一致
  return `[id="${decodeURIComponent(cleanUrl)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')}"]`;
};

// 判断是否已滚动到页面底部（或接近底部）
const isNearBottom = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const clientHeight = window.innerHeight || document.documentElement.clientHeight;
  
  // 如果距离底部不到一个视口高度，则认为接近底部
  return scrollTop + clientHeight > scrollHeight - clientHeight * 0.5;
};

type TocItem = {
  value: string;
  url: string;
  depth: number;
};

interface TableOfContentsProps {
  toc: TocItem[];
  className?: string;
  debug?: boolean; // 调试模式开关
}

const TableOfContents = (props: TableOfContentsProps) => {
  const { toc, className, debug = false } = props;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
  const scrollListenerRef = useRef<number | null>(null);
  const lastScrollYRef = useRef<number>(0);
  const lastActiveIdRef = useRef<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const activeTocRef = useRef<HTMLUListElement | null>(null);

  // 滚动相关配置
  const SCROLL_OFFSET = 80; // 减小偏移量，避免过度滚动
  const SCROLL_BEHAVIOR = 'smooth' as const; // 平滑滚动

  // 日志输出，仅在调试模式下生效
  const log = (message: string, data?: any) => {
    if (debug) {
      console.log(`[TableOfContents] ${message}`, data || '');
    }
  };

  // 监听页面滚动，检测是否接近底部和滚动方向
  useEffect(() => {
    const handleScroll = () => {
      const atBottom = isNearBottom();
      if (atBottom !== isAtBottom) {
        setIsAtBottom(atBottom);
      }
      
      // 更新滚动方向
      const currentScrollY = window.scrollY;
      lastScrollYRef.current = currentScrollY;
    };

    // 使用 requestAnimationFrame 优化滚动性能
    const onScroll = () => {
      if (scrollListenerRef.current !== null) {
        cancelAnimationFrame(scrollListenerRef.current);
      }
      scrollListenerRef.current = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollListenerRef.current !== null) {
        cancelAnimationFrame(scrollListenerRef.current);
      }
    };
  }, [isAtBottom]);

  // 滚动到活动目录项
  const scrollToActiveItem = (element: HTMLElement) => {
    const container = element.closest('ul');
    if (!container) return;
    
    // 计算元素在容器内的相对位置
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    // 判断元素是否在可视区域内
    const isInView = 
      elementRect.top >= containerRect.top + SCROLL_OFFSET && 
      elementRect.bottom <= containerRect.bottom - SCROLL_OFFSET;
    
    // 仅当元素不在可视区域时才滚动
    if (!isInView) {
      const scrollTop = element.offsetTop - container.clientHeight / 3;
      
      container.scrollTo({
        top: scrollTop,
        behavior: SCROLL_BEHAVIOR
      });
      log('滚动目录到位置', scrollTop);
    }
  };

  // 设置 IntersectionObserver 来监测标题元素
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let retryCount = 0;
    const maxRetries = 5; // 增加重试次数
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // 过滤出可见的标题元素
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length === 0) return;

      log('可见标题数量', visibleEntries.length);
      
      // 评分并选择最适合的标题元素
      const mostVisibleEntry = visibleEntries.reduce((best, current) => {
        const bestBounds = best.boundingClientRect;
        const currentBounds = current.boundingClientRect;
        const windowHeight = window.innerHeight;
        const windowCenter = windowHeight / 2;
        
        // 基于元素在视口中的位置计算评分
        // 1. 可见比例 (0-1)
        // 2. 距离视口中心的距离 (越近越好)
        // 3. 元素在视口中的位置 (上半部分加权更高)
        const bestVisibility = best.intersectionRatio;
        const currentVisibility = current.intersectionRatio;
        
        const bestDistance = Math.abs(bestBounds.top + bestBounds.height / 2 - windowCenter);
        const currentDistance = Math.abs(currentBounds.top + currentBounds.height / 2 - windowCenter);
        
        // 偏好上半部分的元素
        const bestPosition = bestBounds.top < windowCenter ? 1.2 : 1;
        const currentPosition = currentBounds.top < windowCenter ? 1.2 : 1;
        
        // 综合评分 (可见比例 * 位置加权 - 距离中心的归一化距离)
        const bestScore = bestVisibility * bestPosition - (bestDistance / windowHeight * 0.5);
        const currentScore = currentVisibility * currentPosition - (currentDistance / windowHeight * 0.5);
        
        log('评分比较', {
          bestId: best.target.id,
          bestScore,
          currentId: current.target.id,
          currentScore,
        });
        
        return bestScore > currentScore ? best : current;
      });

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // 近底部特殊处理：当页面接近底部时，优先考虑最后的标题元素
        if (isAtBottom && toc.length > 0) {
          const lastHeadingSelector = createValidSelector(toc[toc.length - 1].url);
          const lastHeadingElement = document.querySelector(lastHeadingSelector);
          
          // 如果最后一个标题在视口中，则选择它
          if (lastHeadingElement && visibleEntries.some(entry => entry.target === lastHeadingElement)) {
            const lastHeadingId = lastHeadingElement.id;
            const cleanLastHeadingId = decodeURIComponent(lastHeadingId)
              .toLowerCase()
              .replace(/[^a-z0-9-]/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '');
            
            log('底部处理：选择最后标题', cleanLastHeadingId);
            setActiveId(cleanLastHeadingId);
            lastActiveIdRef.current = cleanLastHeadingId;
            return;
          }
        }
        
        // 常规处理：选择评分最高的标题
        const newActiveId = mostVisibleEntry.target.id;
        const cleanNewActiveId = decodeURIComponent(newActiveId)
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        
        // 避免频繁更新：仅当ID变化时才更新
        if (cleanNewActiveId !== lastActiveIdRef.current) {
          log('设置新活动ID', cleanNewActiveId);
          setActiveId(cleanNewActiveId);
          lastActiveIdRef.current = cleanNewActiveId;
        }
      }, 100); // 减少延迟时间，提高响应速度
    };

    // 优化 IntersectionObserver 配置
    const observerOptions = {
      root: null,
      // 扩大观察区域，确保能提前捕获到元素
      rootMargin: '-5% 0px -5% 0px', 
      // 更精细的阈值，提供平滑过渡
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] 
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    observerRef.current = observer;
    
    // 设置观察器并处理重试逻辑
    const setupObserver = () => {
      // 获取所有标题元素
      const elements = toc.map(({ url }) => {
        const selector = createValidSelector(url);
        const element = document.querySelector(selector);
        return { selector, element, url };
      });
      
      // 找出缺失的元素
      const missingElements = elements.filter(({ element }) => !element);
      if (missingElements.length > 0 && retryCount < maxRetries) {
        log(`尝试 ${retryCount + 1}/${maxRetries} 查找缺失的标题元素`, 
            missingElements.map(e => e.selector));
        retryCount++;
        setTimeout(setupObserver, 500);
        return;
      }
      
      // 观察所有找到的元素
      const foundElements = elements.filter(({ element }) => element);
      log('找到标题元素', foundElements.length);
      
      foundElements.forEach(({ element, selector, url }) => {
        if (element) {
          observer.observe(element);
          log('观察标题', { url, selector });
        }
      });
    };
    
    setupObserver();
    
    // 清理函数
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [toc, isAtBottom, debug]);

  // 当 activeId 变化时，滚动到对应的目录项
  useEffect(() => {
    if (activeId) {
      const activeElement = document.querySelector(`[data-toc-id="${activeId}"]`);
      if (activeElement) {
        scrollToActiveItem(activeElement as HTMLElement);
      }
    }
  }, [activeId]);

  return (
    <details className={clsx('space-y-4 [&_.chevron-right]:open:rotate-90', className)} open>
      <summary className="flex cursor-pointer items-center gap-1 marker:content-none">
        <span className="chevron-right inline-block h-5 w-5 rotate-0 transition-transform before:inline-block before:content-['\25B6']" />
        <span className="text-lg font-medium">Table of Contents</span>
      </summary>

      <ul 
        ref={activeTocRef}
        className="flex flex-col space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto"
      >
        {toc.map(({ value, depth, url }) => {
          const cleanUrl = url.replace(/-\d+$/, '');
          const decodedUrl = decodeURIComponent(cleanUrl)
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
          return (
            <li
              key={url}
              data-toc-id={decodedUrl}
              className={clsx('text-gray-500 dark:text-gray-400 transition-all duration-300 hover:text-gray-900 dark:hover:text-gray-200', {
                'text-primary-600 dark:text-primary-400 font-medium border-l-2 border-primary-600 pl-2 -ml-[2px] bg-primary-50/50 dark:bg-primary-900/20': activeId === decodedUrl,
              })}
              style={{ paddingLeft: (depth - 2) * 16 }}
            >
              <Link href={decodeURIComponent(cleanUrl)}>{value}</Link>
            </li>
          );
        })}
      </ul>
      {debug && activeId && (
        <div className="text-xs mt-2 text-gray-500">
          当前活动ID: {activeId}
        </div>
      )}
    </details>
  );
};

export default TableOfContents;
