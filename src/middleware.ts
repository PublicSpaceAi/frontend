import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export const middleware = withAuth(
  function middleware(req) {
    // Check if user is authenticated
    if (!req.nextauth.token) {
      // Redirect to login if trying to access protected routes
      return NextResponse.redirect(new URL("/login", req.url))
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

// Specify which routes to protect
export const config = {
  matcher: ["/dashboard/:path*"],
}
