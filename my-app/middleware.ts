import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authPrefixes = ["/profile", "/vehicles/upload_car"];
const rolePrefixes = ["/vehicles/upload_car"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  const { pathname } = req.nextUrl;
  const url = req.nextUrl;

  if (authPrefixes.includes(pathname) && !token) {
    url.pathname = `/`;
    url.search = `?from=${pathname}`;
    return NextResponse.redirect(url);
  }

  if (rolePrefixes.includes(pathname) && !token) {
    if (role != "renter" && role != "provider") {
      await fetch("/api/auth/logout")
        .then((res) => {
          if (res.ok) {
            url.pathname = `/`;
            return NextResponse.redirect(url);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  if (pathname === "/" && token) {
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
