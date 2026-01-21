import { z } from "zod";

export const bookingSourceSchema = z.enum([
  "contact_form",
  "fare_calculator",
  "whatsapp_floating_button",
]);

export const bookingCreateSchema = z.object({
  source: bookingSourceSchema,
  name: z.string().min(1),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")).transform((v) => (v === "" ? undefined : v)),
  serviceType: z.string().min(1),
  pickup: z.string().min(1),
  drop: z.string().min(1),
  pickupDateTime: z.string().min(1),

  carType: z.string().optional(),
  tripType: z.string().optional(),
  distanceKm: z.number().optional(),
  estimatedFare: z.number().int().optional(),

  notes: z.string().optional(),
});

export type BookingCreateInput = z.infer<typeof bookingCreateSchema>;

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

