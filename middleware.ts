import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if we are accessing a protected route
  if (
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/new') ||
    request.nextUrl.pathname.startsWith('/clients') ||
    request.nextUrl.pathname.startsWith('/invoice')
  ) {
    // Check for our auth cookie
    const authCookie = request.cookies.get('admin_auth');

    if (!authCookie || authCookie.value !== 'true') {
      // Not authenticated, redirect to login page
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow the request to proceed if authenticated or not a protected route
  return NextResponse.next();
}

// Ensure the middleware only runs on these paths
export const config = {
  matcher: ['/dashboard/:path*', '/new/:path*', '/clients/:path*', '/invoice/:path*'],
};
