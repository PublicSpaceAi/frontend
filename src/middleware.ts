import { NextResponse } from "next/server"

// TEMPORARILY DISABLED - No-op middleware
// All authentication has been disabled for now
export function middleware(req: any) {
  return NextResponse.next()
}

// Specify which routes to protect (currently none since auth is disabled)
export const config = {
  matcher: [],
}
