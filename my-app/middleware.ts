import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authPrefixes = ["/profile"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const { pathname, origin } = req.nextUrl;

  if (authPrefixes.some((prefix) => pathname.startsWith(prefix)) && !token) {
    return NextResponse.redirect(`${origin}/`);
  }

  if (pathname.startsWith(`${origin}`) && token) {
    return NextResponse.redirect(`${origin}/searchcar`);
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
