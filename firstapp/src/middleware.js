import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextFetchEvent, NextRequest, NextResponse } from "next/server"

// export { default } from "next-auth/middleware"

export default withAuth(
    middleware = (req) => {
        if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin") {
            return NextResponse.rewrite(
                new URL("/login", req.url)
            );
        }
        if (req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "user")
            return NextResponse.rewrite(
                new URL("/login", req.url)
            );
    },
    {
        callbacks: {
            authorize: ({ token }) => {
                console.log('token', token)
            }
        }
    }

)
export const config = { matcher: ["/user/:path*", "/admin/:path*"] }