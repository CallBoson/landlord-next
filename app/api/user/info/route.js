import db from "../../../../helpers/db.js";
import { handler, apiMiddleware, authInfo, handleSuccess } from "@/helpers/api";

const getUserInfo = handler(
  async (request) => {
    const { id } = authInfo.get(request);

    const [[user]] = await db.query(`SELECT * FROM Users WHERE id = ?`, [id]);
    return handleSuccess({ data: user });
  },
  [apiMiddleware]
);

export const POST = getUserInfo;
