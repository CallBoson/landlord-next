import { NextResponse } from "next/server";
import { auth } from "../jwt";

const isPublicPath = (pathname) => {
  const publicPaths = ["/login"];
  return publicPaths.includes(pathname);
};

export const pageMiddleware = async (request) => {
  if (isPublicPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  } else {
    const token = request.cookies.get("token")?.value;
    const decoded = await auth.verify(token);
    if (!decoded) {
      throw NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
};
