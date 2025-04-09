import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"
import nextauth from "@/config/nextauth"

const PROTECTED_PATHS = ["/admin"]

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: nextauth.secret,
  })

  const isAuth = !!token
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth")

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/", request.url))
    }
    return NextResponse.next()
  }

  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  )

  if (!isAuth && isProtectedPath) {
    const url = new URL("/auth/login", request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
}
