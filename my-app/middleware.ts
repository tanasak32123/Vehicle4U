import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import isAuthValid from "libs/auth/isAuthValid";

const authPrefixes = ["/vehicle", "/user", "/provider"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  const url = req.nextUrl;

  const startwithsAuth = (): boolean => {
    authPrefixes.forEach((e: string) => {
      if (url.pathname.startsWith(e)) {
        return true;
      }
    });
    return false;
  };

  if (startwithsAuth() && !isAuthValid(req)) {
    url.search = `?from=${url.pathname}`;
    url.pathname = `/`;
    return NextResponse.redirect(url);
  }

  if (url.pathname === "/" && isAuthValid(req)) {
    url.pathname = `/vehicle`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
