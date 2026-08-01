import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export async function middleware(request:NextRequest){
    const sessionToken = request.cookies.get('better-auth.session_token');
    const publicCheckoutPaths = ['/checkout/success', '/checkout/failed'];
    const protectedPaths = ['/admin','/orders','/addresses','/checkout'];

    const pathname = request.nextUrl.pathname;
    const isPublicCheckoutRedirect = publicCheckoutPaths.some(path => pathname === path || pathname.startsWith(`${path}/`));
    const isProtected = protectedPaths.some(path => pathname.startsWith(path));

    if (!sessionToken && isProtected && !isPublicCheckoutRedirect){
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    return NextResponse.next();
}

export const config = {
  matcher: ["/orders/:path*", "/addresses/:path*", "/admin/:path*", "/checkout" , "/checkout/:path*"],
}
