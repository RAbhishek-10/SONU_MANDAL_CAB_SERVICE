import { adminLoginSchema } from "../../src/server/validation";
import { getEnv } from "../../src/server/env";
import { signAdminJwt, verifyAdminPassword } from "../../src/server/auth";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const parsed = adminLoginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid data" });
      return;
    }

    const { email, password } = parsed.data;
    const env = getEnv();

    if (email !== env.ADMIN_EMAIL) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const ok = await verifyAdminPassword(password);
    if (!ok) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = signAdminJwt(email);
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

