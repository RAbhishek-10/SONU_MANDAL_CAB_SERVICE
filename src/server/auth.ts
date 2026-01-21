import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getEnv } from "./env";

export interface AdminJwtPayload {
  sub: string;
  email: string;
}

export function signAdminJwt(email: string): string {
  const env = getEnv();
  const payload: AdminJwtPayload = {
    sub: email,
    email,
  };

  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyAdminJwt(token: string): AdminJwtPayload | null {
  const env = getEnv();
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as AdminJwtPayload;
    if (decoded.email !== env.ADMIN_EMAIL) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const env = getEnv();
  return bcrypt.compare(password, env.ADMIN_PASSWORD_HASH);
}

