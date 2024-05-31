// 快速注册
import db from "../../../../../helpers/db.js";
import { auth } from "@/helpers/jwt.js";
import { NextResponse } from "next/server.js";

export async function POST(req) {
  const [{ insertId }] = await db.query(
    `
  INSERT INTO Users (name) 
  VALUES (?)
`,
    ["fast_start"]
  );

  const token = await auth.sign({ id: insertId, name: "fast_start" });

  return NextResponse.json(
    { token },
    {
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`,
      },
    }
  );
}
