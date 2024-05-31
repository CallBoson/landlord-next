import db from "../../../../helpers/db.js";
import { handler, apiMiddleware, authInfo } from "@/helpers/api";

const getUserInfo = handler(
  (request) => {
    const { id } = authInfo.get(request);
    return Response.json({});
  },
  [apiMiddleware]
);

export const POST = getUserInfo;
