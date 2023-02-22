import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/")) {
    return NextResponse.rewrite(new URL("/index", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.rewrite(new URL("/userProfile", req.url));
  }
}

export const config = {
  matcher: [
    "/profile",
    "/",
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
