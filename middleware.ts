import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export async function middleware(request:NextRequest){
    const sessionToken = request.cookies.get('better-auth.session_token');
    const protectedPaths = ['/admin','/orders','/addresses'];

    const isProtected = protectedPaths.some(path => 
            request.nextUrl.pathname.startsWith(path)
    );

    if (!sessionToken && isProtected){
        return NextResponse.redirect(new URL(('/sign-in'),request.url))
    }
    return NextResponse.next();
}

export const config = {
  matcher: ["/orders/:path*", "/addresses/:path*", "/admin/:path*", "/checkout/:path*"],
}
