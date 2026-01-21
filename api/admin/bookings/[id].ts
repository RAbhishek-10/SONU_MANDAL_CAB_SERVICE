import { PrismaClient, BookingStatus } from "@prisma/client";
import { verifyAdminJwt } from "../../../src/server/auth";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token || !verifyAdminJwt(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const id = req.query.id as string | undefined;
  if (!id) {
    res.status(400).json({ error: "Missing id" });
    return;
  }

  if (req.method !== "PATCH") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const { status, notes } = (req.body || {}) as {
      status?: BookingStatus;
      notes?: string;
    };

    const data: any = {};
    if (status && ["NEW", "CONTACTED", "CONFIRMED", "CANCELLED"].includes(status)) {
      data.status = status;
    }
    if (typeof notes === "string") {
      data.notes = notes;
    }

    if (Object.keys(data).length === 0) {
      res.status(400).json({ error: "Nothing to update" });
      return;
    }

    const booking = await prisma.booking.update({
      where: { id },
      data,
    });

    res.status(200).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

