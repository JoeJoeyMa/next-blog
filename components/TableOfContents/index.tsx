'use client';

import { useState, useEffect } from 'react';
import { clsx } from 'clsx';

import Link from '@/components/mdxcomponents/Link'

// 辅助函数：将标题文本转换为有效的选择器
const createValidSelector = (url: string) => {
  // 移除URL中的数字后缀
  const cleanUrl = url.replace(/-\d+$/, '');
  // 对特殊字符进行编码
  return `[id="${decodeURIComponent(cleanUrl).replace(/"/g, '\\"')}"]`;
};

type TocItem = {
  value: string;
  url: string;
  depth: number;
};

interface TableOfContentsProps {
  toc: TocItem[];
  className?: string;
}

const TableOfContents = (props: TableOfContentsProps) => {
  const { toc, className } = props;
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '0px 0px -80% 0px',
      threshold: 0.1,
    });

    toc.forEach(({ url }) => {
      const selector = createValidSelector(url);
      const element = document.querySelector(selector);

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      toc.forEach(({ url }) => {
        const selector = createValidSelector(url);
        const element = document.querySelector(selector);

        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [toc]);

  return (
    <details className={clsx('space-y-4 [&_.chevron-right]:open:rotate-90', className)} open>
      <summary className="flex cursor-pointer items-center gap-1 marker:content-none">
        <span className="chevron-right inline-block h-5 w-5 rotate-0 transition-transform before:inline-block before:content-['\25B6']" />
        <span className="text-lg font-medium">Table of Contents</span>
      </summary>

      <ul className="flex flex-col space-y-2">
        {toc.map(({ value, depth, url }) => {
          const cleanUrl = url.replace(/-\d+$/, '');
          const decodedUrl = decodeURIComponent(cleanUrl);
          return (
            <li
              key={url}
              className={clsx('text-gray-500 dark:text-gray-400', {
                'text-gray-200 dark:text-primary-600': activeId === decodedUrl,
              })}
              style={{ paddingLeft: (depth - 2) * 16 }}
            >
              <Link href={decodeURIComponent(cleanUrl)}>{value}</Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
};

export default TableOfContents;
