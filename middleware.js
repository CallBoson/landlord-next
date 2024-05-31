import { pageMiddleware } from "./helpers/page-middleware";
import { apiMiddleware } from "./helpers/api-middleware";

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/api")) {
    // API
    try {
      await apiMiddleware(request);
    } catch (errHandler) {
      return errHandler;
    }
  } else {
    // 页面中间件
    try {
      await pageMiddleware(request);
    } catch (errHandler) {
      return errHandler;
    }
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
};
