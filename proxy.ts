import { type NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // الصفحات المحمية التي تتطلب تسجيل دخول
  const protectedRoutes = ["/profile", "/orders"];

  // التحقق من وجود token في cookies
  const token = request.cookies.get("accessToken")?.value;
  const isAuthenticated = !!token;

  // إذا كان المستخدم يحاول الوصول لصفحة محمية بدون token
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      // إعادة التوجيه إلى صفحة تسجيل الدخول مع الحفاظ على URL الأصلي
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next()

  // Cache static assets for 1 year (immutable)
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|avif|ico)$/)) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable")
  }

  // Cache API responses appropriately
  if (request.nextUrl.pathname.startsWith("/api")) {
    response.headers.set("Cache-Control", "public, max-age=60, s-maxage=120, stale-while-revalidate=3600")
  }

  // HTML pages: short cache with stale-while-revalidate
  if (request.nextUrl.pathname.endsWith("/") || request.nextUrl.pathname.endsWith(".html")) {
    response.headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800")
  }

  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()")

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

