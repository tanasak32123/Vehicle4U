import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authRoutePrefix = ["/vehicle", "/user", "/provider", "/chat"];

const renterRoutePrefix = [
  "/vehicle/rent",
  "/vehicle/renter",
  "/vehicle/search",
];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  const currentRole = req.cookies.get("currentRole")?.value;

  if (
    !token ||
    (!role && !currentRole) ||
    (role && role !== "provider" && role !== "renter") ||
    (currentRole && currentRole !== "provider" && currentRole !== "renter")
  ) {
    for (let i = 0; i < authRoutePrefix.length; i++) {
      if (req.nextUrl.pathname.startsWith(authRoutePrefix[i])) {
        req.nextUrl.pathname = `/`;
        return NextResponse.redirect(req.nextUrl);
      }
    }
  } else if (req.nextUrl.pathname === "/") {
    const role =
      req.cookies.get("currentRole")?.value || req.cookies.get("role")?.value;

    if (role === "renter") {
      req.nextUrl.pathname = `/vehicle/search`;
    } else if (role === "provider") {
      req.nextUrl.pathname = `/provider/vehicle`;
    }
    return NextResponse.redirect(req.nextUrl);
  }

  const roleUsed =
    req.cookies.get("currentRole")?.value || req.cookies.get("role")?.value;

  if (
    renterRoutePrefix.includes(req.nextUrl.pathname) &&
    roleUsed !== "renter"
  ) {
    req.nextUrl.pathname = `/`;
    return NextResponse.redirect(req.nextUrl);
  }

  if (req.nextUrl.pathname.startsWith("/provider") && roleUsed !== "provider") {
    req.nextUrl.pathname = `/`;
    return NextResponse.redirect(req.nextUrl);
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
