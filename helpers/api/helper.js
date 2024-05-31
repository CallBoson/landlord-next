import { NextResponse } from "next/server";

export const handleError = ({ error = "", status = 400 }) => {
  return NextResponse.json({ error }, { status });
};

export const handleSuccess = ({
  data = {},
  message = "操作成功",
  status = 200,
}) => {
  return NextResponse.json({ data, message }, { status });
};

export const authInfo = {
  set: (request, data) => {
    request.headers.set("auth-info", JSON.stringify(data));
  },
  get: (request) => {
    return JSON.parse(request.headers.get("auth-info"));
  },
};
