import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();

  let isLogin = request.cookies.get('token');

  if (!isLogin) {
    const protectedPaths = ["/wishlist", "/checkout", "/success","/my-account"];

    if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
  } else {
    if (url.pathname === "/login") {
      // url.pathname = "/admin";
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // if (request.nextUrl.pathname.startsWith('/index')) {
  //   return NextResponse.rewrite(new URL('/', request.url));
  // }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.rewrite(new URL('/admin', request.url));
  }
}
