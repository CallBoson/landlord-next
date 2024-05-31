import { NextResponse } from "next/server";
import { auth } from "../jwt";
import { handleError } from "./helper";

const isPublicPath = (method, pathname) => {
  const publicPaths = ["POST:/api/user/register/quick"];
  return publicPaths.includes(`${method}:${pathname}`);
};

export const apiMiddleware = async (request) => {
  if (isPublicPath(request.method, request.nextUrl.pathname)) {
    return NextResponse.next();
  } else {
    const token = request.cookies.token;
    const decoded = auth.verify(token);
    if (!decoded) {
      throw handleError({ error: "Unauthorized", status: 401 });
    }
    return NextResponse.next();
  }
};
