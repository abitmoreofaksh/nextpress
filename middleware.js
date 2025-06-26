// middleware.js (in your app root directory)
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Define public routes (only these are accessible without authentication)
  const publicRoutes = ["/login", "/register"];

  const isPublicRoute = publicRoutes.includes(pathname);

  // If it's a public route, allow access
  if (isPublicRoute) {
    // If user has valid token and tries to access login/register, redirect to home
    if (token) {
      try {
        const secret = new TextEncoder().encode(
          process.env.NEXT_PUBLIC_JWT_SECRET
        );
        const { payload } = await jwtVerify(token, secret);

        // Token is valid, redirect authenticated user away from login/register
        return NextResponse.redirect(new URL("/", request.url));
      } catch (error) {
        // Invalid token, allow access to login/register
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // For all other routes (protected routes), check authentication
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify JWT token
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Check if token is expired (jwtVerify automatically checks exp claim)
    // If we reach here, token is valid and not expired
    return NextResponse.next();
  } catch (error) {
    // Token is invalid or expired
    console.error("JWT verification failed:", error.message);

    // Clear the invalid token cookie
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");

    return response;
  }
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
