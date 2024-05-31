import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = "landlord";

// 使用 jose 创建 JWT
const sign = async (data = {}) => {
  const jwtConstructor = new SignJWT(data);
  const token = await jwtConstructor
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(new TextEncoder().encode(JWT_SECRET));
  return token;
};

// 使用 jose 验证 JWT
const verify = async (token) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET),
      {
        algorithms: ["HS256"],
      }
    );
    return payload;
  } catch (error) {
    return null;
  }
};

export const auth = {
  sign,
  verify,
};
