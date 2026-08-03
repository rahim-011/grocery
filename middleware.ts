import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { rateLimiters, getIp } from "@/lib/rate-limit";

export async function middleware(request: NextRequest) {
  const ip = getIp(request);
  const path = request.nextUrl.pathname;

  let limiter = rateLimiters.api;
  if (path.startsWith("/api/routes/checkout")) {
    limiter = rateLimiters.checkout;
  } else if (path.includes("/sign-in") || path.includes("/sign-up")) {
    limiter = rateLimiters.auth;
  }

  const { success } = await limiter.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests, try again!" },
      { status: 429 }
    );
  }

  const sessionCookie = getSessionCookie(request);

  const publicCheckoutPaths = ["/checkout/success", "/checkout/failed"];
  const protectedPaths = ["/admin", "/orders", "/addresses", "/checkout"];

  const pathname = request.nextUrl.pathname;
  const isPublicCheckoutRedirect = publicCheckoutPaths.some(
    (item) => pathname === item || pathname.startsWith(`${item}/`)
  );
  const isProtected = protectedPaths.some((item) => pathname.startsWith(item));

  if (!sessionCookie && isProtected && !isPublicCheckoutRedirect) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/orders/:path*", "/addresses/:path*", "/admin/:path*", "/checkout", "/checkout/:path*"],
};