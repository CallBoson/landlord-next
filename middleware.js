import { NextResponse } from "next/server";
import { auth } from "./helpers/jwt";

const isPublicPath = (pathname) => {
  const publicPaths = ["/login"];
  return publicPaths.includes(pathname);
};

export async function middleware(request) {
  if (isPublicPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  } else {
    const token = request.cookies.get("token")?.value;
    const decoded = await auth.verify(token);
    if (!decoded) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api_next/static|_next/image|.*\\.png$).*)"],
};
