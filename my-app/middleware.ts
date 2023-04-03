import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import isAuthValid from "libs/auth/isAuthValid";

const authPrefixes = ["/vehicle", "/user", "/provider", "/chat"];

export async function middleware(req: NextRequest) {
  const currentRole = req.cookies.get("currentRole")?.value;

  const url = req.nextUrl;

  const startwithsAuth = (): boolean => {
    let result = false;
    authPrefixes.forEach((e: string) => {
      if (url.pathname.startsWith(e)) {
        result = true;
      }
    });
    return result;
  };

  if (startwithsAuth() && !isAuthValid(req)) {
    url.search = `?from=${url.pathname}`;
    url.pathname = `/`;
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/provider") && currentRole != "provider") {
    url.pathname = `/`;
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/vehicle") && currentRole != "renter") {
    url.pathname = `/`;
    return NextResponse.redirect(url);
  }

  if (url.pathname === "/" && isAuthValid(req)) {
    if (currentRole == "renter") {
      url.pathname = `/vehicle`;
    } else {
      url.pathname = `/provider/vehicle`;
    }
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
