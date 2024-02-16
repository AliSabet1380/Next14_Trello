import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhook"],
  afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute) {
      if (auth.orgId)
        return NextResponse.redirect(
          new URL(`organization/${auth.orgId}`, req.url)
        );

      return NextResponse.redirect(new URL("/select-org", req.url));
    }
    if (!auth.userId && !auth.isPublicRoute)
      return NextResponse.redirect(new URL("/sign-in", req.url));
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org")
      return NextResponse.redirect(new URL("/select-org", req.url));
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
