import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authenticate } from "../libs/auth";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/about-temp";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/about_us"],
};
