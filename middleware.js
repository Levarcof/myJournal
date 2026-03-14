import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  let isLoggedIn = false;

  // 🔐 Verify token if exists
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      isLoggedIn = true;
    } catch (error) {
      console.log("Invalid token");

      // Delete invalid token
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("token");
      return response;
    }
  }

  // ❌ If NOT logged in
  if (!isLoggedIn) {
    if (
      !pathname.startsWith("/login") &&
      !pathname.startsWith("/register")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // ✅ If logged in → prevent login/signup access
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    // "/((?!_next|api|favicon.ico).*)",  ye har roote par middleware chalane ke liye hai
  ],
};