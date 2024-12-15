import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isLoggedIn = req.cookies.get('auth_token');

    // if (!isLoggedIn && pathname !== '/' && pathname !== '/register') {
    //     return NextResponse.redirect(new URL('/', req.url));
    // }

    if (isLoggedIn && (pathname === '/' || pathname === '/register')) {
        return NextResponse.redirect(new URL('/socialfeed', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/register', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};