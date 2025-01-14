import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoggedIn = req.cookies.get("auth_token");
  const userType = req.cookies.get("user_type");

  if (
    !isLoggedIn &&
    pathname !== "/" &&
    pathname !== "/register" &&
    pathname !== "/terminos" &&
    pathname !== "/completarregistro" &&
    pathname !== "/subirfoto"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    isLoggedIn &&
    (pathname === "/" ||
      pathname === "/register" ||
      pathname === "/completarregistro" ||
      pathname === "/subirfoto")
  ) {
    return NextResponse.redirect(new URL("/socialfeed", req.url));
  }

  if (
    pathname.startsWith("/dashboard") &&
    userType &&
    userType.value !== "admin"
  ) {
    return NextResponse.redirect(new URL("/socialfeed", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/register",
    "/terminos",
    "/socialfeed",
    "/dashboard/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
