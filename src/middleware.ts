import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Helper function to check if the path is not accessible to logged-in users
const isLoggedInUserRestrictedPath = (pathname: string) => {
  return pathname === "/login" || pathname === "/register";
};

// Helper function to handle redirection
const redirectTo = (url: string, request: NextRequest) => {
  return NextResponse.redirect(new URL(url, request.url));
};

export async function middleware(request: NextRequest) {
  const authToken = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // If the user is logged in and tries to access restricted paths
  if (isLoggedInUserRestrictedPath(pathname)) {
    if (authToken) {
      return redirectTo("/", request);
    }
  }

  // If trying to access any other restricted paths without being logged in
  if (!authToken && pathname.startsWith("/dashboard")) {
    return redirectTo("/login", request);
  }
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
