-- CreateEnum
CREATE TYPE "BookingSource" AS ENUM ('CONTACT_FORM', 'FARE_CALCULATOR', 'WHATSAPP_FLOATING_BUTTON');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('NEW', 'CONTACTED', 'CONFIRMED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "source" "BookingSource" NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "serviceType" TEXT NOT NULL,
    "pickup" TEXT NOT NULL,
    "drop" TEXT NOT NULL,
    "pickupDateTime" TIMESTAMP(3) NOT NULL,
    "carType" TEXT,
    "tripType" TEXT,
    "distanceKm" DOUBLE PRECISION,
    "estimatedFare" INTEGER,
    "notes" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'NEW',
    "whatsappText" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Booking_phone_createdAt_idx" ON "Booking"("phone", "createdAt");

-- CreateIndex
CREATE INDEX "Booking_status_createdAt_idx" ON "Booking"("status", "createdAt");
