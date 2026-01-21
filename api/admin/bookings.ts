import { PrismaClient, BookingStatus } from "@prisma/client";
import { verifyAdminJwt } from "../../src/server/auth";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token || !verifyAdminJwt(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const {
      status,
      q,
      from,
      to,
      limit = "50",
      cursor,
    } = req.query as Record<string, string | undefined>;

    const where: any = {};

    if (status && ["NEW", "CONTACTED", "CONFIRMED", "CANCELLED"].includes(status)) {
      where.status = status as BookingStatus;
    }

    if (from || to) {
      where.createdAt = {};
      if (from) {
        where.createdAt.gte = new Date(from);
      }
      if (to) {
        where.createdAt.lte = new Date(to);
      }
    }

    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { phone: { contains: q } },
        { pickup: { contains: q, mode: "insensitive" } },
        { drop: { contains: q, mode: "insensitive" } },
      ];
    }

    const take = Math.min(parseInt(limit, 10) || 50, 100);

    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: take + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
    });

    const hasMore = bookings.length > take;
    const items = hasMore ? bookings.slice(0, take) : bookings;
    const nextCursor = hasMore ? items[items.length - 1]?.id : null;

    res.status(200).json({
      items,
      nextCursor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

