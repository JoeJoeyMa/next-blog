import { NextResponse, NextRequest } from 'next/server'

// 定义支持的语言
const locales = ['en', 'zh'] as const
const fallbackLng = 'en'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 检查是否是爬虫请求
  const userAgent = request.headers.get('user-agent') || ''
  const isBot = /bot|crawler|spider|crawling/i.test(userAgent)
  
  // 如果是爬虫请求，直接返回默认语言版本的内容
  if (isBot) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL(`/${fallbackLng}`, request.url))
    }
    return NextResponse.next()
  }

  // 检查是否已经包含语言前缀
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    // 重定向到默认语言版本
    return NextResponse.redirect(new URL(`/${fallbackLng}${pathname}`, request.url))
  }
}

export const config = {
  matcher: [
    // 排除静态文件和API路由
    '/((?!api|static|track|data|css|scripts|.*\\..*|_next).*|sitemap.xml)',
    // 排除 robots.txt
    '/((?!robots.txt).*)',
  ],
}
