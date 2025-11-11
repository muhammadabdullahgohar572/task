import { NextResponse } from "next/server";

export async function proxy(request) {
  const jwt = request.cookies.get("authtoken")?.value;

  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const pathnames =
    request.nextUrl.pathname == "/pages/Login" ||
    request.nextUrl.pathname == "/pages/Signup";

  if (!jwt && !pathnames) {
    return NextResponse.redirect(new URL("/pages/Login", request.url));
  }
  if (jwt && pathnames) {
    return NextResponse.redirect(new URL("/pages/showpages", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/pages/showpages",
    "/pages/Login",
    "/pages/Signup",
    "/pages/Add_Task",
  ],
};
