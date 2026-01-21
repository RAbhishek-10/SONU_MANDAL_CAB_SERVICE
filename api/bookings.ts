import { PrismaClient } from "@prisma/client";
import { bookingCreateSchema } from "../src/server/validation";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const parsed = bookingCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid data", details: parsed.error.flatten() });
      return;
    }

    const data = parsed.data;

    const whatsappLines = [
      "Hi, I want to book a cab.",
      "",
      `Source: ${data.source}`,
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      data.email ? `Email: ${data.email}` : null,
      `Service: ${data.serviceType}`,
      `Pickup: ${data.pickup}`,
      `Drop: ${data.drop}`,
      `Date & Time: ${data.pickupDateTime}`,
      data.carType ? `Car Type: ${data.carType}` : null,
      data.tripType ? `Trip Type: ${data.tripType}` : null,
      typeof data.distanceKm === "number" ? `Distance: ${data.distanceKm} km` : null,
      typeof data.estimatedFare === "number" ? `Estimated Fare: ₹${data.estimatedFare}` : null,
      data.notes ? `Notes: ${data.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const booking = await prisma.booking.create({
      data: {
        source:
          data.source === "contact_form"
            ? "CONTACT_FORM"
            : data.source === "fare_calculator"
            ? "FARE_CALCULATOR"
            : "WHATSAPP_FLOATING_BUTTON",
        name: data.name,
        phone: data.phone,
        email: data.email,
        serviceType: data.serviceType,
        pickup: data.pickup,
        drop: data.drop,
        pickupDateTime: new Date(data.pickupDateTime),
        carType: data.carType,
        tripType: data.tripType,
        distanceKm: data.distanceKm,
        estimatedFare: data.estimatedFare,
        notes: data.notes,
        whatsappText: whatsappLines,
      },
    });

    const phoneNumber = "919876543210";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappLines
    )}`;

    res.status(201).json({
      bookingId: booking.id,
      whatsappUrl,
      whatsappText: whatsappLines,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

