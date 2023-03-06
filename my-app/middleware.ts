import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authPrefixes = ["/profile"];

export function middleware(req: NextRequest) {
  // console.log("Middleware");
  const token = req.cookies.get("token")?.value;
  const basicAuth = req.headers.get("authorization");

  const { pathname } = req.nextUrl;
  const url = req.nextUrl;

  if (authPrefixes.some((prefix) => pathname.startsWith(prefix)) && !token) {
    url.pathname = "/";
    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith(`/`) && token) {
    url.pathname = "/searchcar";
    return NextResponse.rewrite(url);
  }

  NextResponse.next();
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
