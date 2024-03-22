import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookieAuthToken = req.cookies.get("privy-token");
  const cookieSession = req.cookies.get("privy-session");
  const requestUrl = req.url;
  const requestPathname = req.nextUrl.pathname;

  // Bypass middleware when `privy_oauth_code` is a query parameter, as
  // we are in the middle of an authentication flow
  if (req.nextUrl.searchParams.get("privy_oauth_code"))
    return NextResponse.next();

  // Bypass middleware for auth routes
  if (requestUrl.includes("/auth/")) return NextResponse.next();

  // If the user has `privy-token`, they are definitely authenticated
  const definitelyAuthenticated = Boolean(cookieAuthToken);
  // If user has `privy-session`, they also have `privy-refresh-token` and
  // may be authenticated once their session is refreshed in the client
  const maybeAuthenticated = Boolean(cookieSession);
  // If user doesn't have both `privy-token` and `privy-session` they are definitely not authenticated
  const definitelyNotAuthenticated =
    !definitelyAuthenticated && !maybeAuthenticated;

  if (definitelyNotAuthenticated) {
    // If user is definitely not authenticated, redirect them to the `/signin` page
    return NextResponse.redirect(
      new URL(`/signin?redirect_to=${requestPathname}`, requestUrl),
    );
  }

  if (!definitelyAuthenticated && maybeAuthenticated) {
    // If user is not authenticated, but is maybe authenticated
    // redirect them to the `/refresh` page to trigger client-side refresh flow
    return NextResponse.redirect(
      new URL(`/auth/refresh?redirect_to=${requestPathname}`, requestUrl),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/bookmarks/:path*", "/profile"],
};
