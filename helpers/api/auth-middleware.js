import { auth } from "../jwt";
import { handleError, authInfo } from "./helper";

const isPublicPath = (method, pathname) => {
  const publicPaths = ["POST:/api/user/register/quick"];
  return publicPaths.includes(`${method}:${pathname}`);
};

export const apiMiddleware = async (request) => {
  if (isPublicPath(request.method, request.nextUrl.pathname)) {
    return;
  }

  const token = request.cookies.get("token")?.value;
  const decoded = await auth.verify(token);
  if (!decoded) {
    throw handleError({ error: "Unauthorized", status: 401 });
  }

  authInfo.set(request, decoded);
};
