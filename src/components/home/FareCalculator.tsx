import { motion } from "framer-motion";
import { useState } from "react";
import { Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const carTypes = [
  { value: "sedan", label: "Sedan (Dzire/Etios)", pricePerKm: 12 },
  { value: "premium-sedan", label: "Premium Sedan", pricePerKm: 15 },
  { value: "innova", label: "Innova Crysta", pricePerKm: 16 },
  { value: "tempo", label: "Tempo Traveller", pricePerKm: 22 },
];

const tripTypes = [
  { value: "one-way", label: "One Way", multiplier: 1 },
  { value: "round-trip", label: "Round Trip", multiplier: 2 },
];

export function FareCalculator() {
  const { toast } = useToast();
  const [distance, setDistance] = useState<number>(0);
  const [carType, setCarType] = useState<string>("sedan");
  const [tripType, setTripType] = useState<string>("one-way");
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  const calculateFare = () => {
    const car = carTypes.find((c) => c.value === carType);
    const trip = tripTypes.find((t) => t.value === tripType);
    
    if (car && trip && distance > 0) {
      const baseFare = distance * car.pricePerKm * trip.multiplier;
      const driverAllowance = tripType === "round-trip" ? 300 : 0;
      const tollEstimate = Math.round(distance * 0.5);
      const total = baseFare + driverAllowance + tollEstimate;
      setEstimatedFare(total);
    }
  };

  const handleWhatsAppBooking = async () => {
    if (!estimatedFare || distance <= 0) return;

    const fallbackUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
      `Hi, I need a ${carType} for ${distance}km ${tripType} trip. Estimated fare: ₹${estimatedFare}`
    )}`;

    try {
      setBookingLoading(true);

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "fare_calculator",
          name: "Website visitor",
          phone: "0000000000",
          serviceType: "fare_calculator",
          pickup: "N/A",
          drop: "N/A",
          pickupDateTime: new Date().toISOString(),
          carType,
          tripType,
          distanceKm: distance,
          estimatedFare,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const data = (await response.json()) as { whatsappUrl: string };
      window.open(data.whatsappUrl, "_blank");

      toast({
        title: "Booking saved",
        description: "Your fare estimate has been saved and WhatsApp is opening.",
      });
    } catch (error) {
      console.error(error);
      window.open(fallbackUrl, "_blank");
      toast({
        title: "Using WhatsApp directly",
        description: "We couldn't reach the server, but WhatsApp is opening.",
        variant: "destructive",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-accent font-medium text-sm uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              Instant Quote
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Fare Calculator
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Get an instant estimate for your trip. Final fare may vary based on 
              actual distance and any waiting time.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="distance">Distance (km)</Label>
                <Input
                  id="distance"
                  type="number"
                  placeholder="e.g., 250"
                  value={distance || ""}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="text-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Car Type</Label>
                <Select value={carType} onValueChange={setCarType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select car" />
                  </SelectTrigger>
                  <SelectContent>
                    {carTypes.map((car) => (
                      <SelectItem key={car.value} value={car.value}>
                        {car.label} (₹{car.pricePerKm}/km)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Trip Type</Label>
                <Select value={tripType} onValueChange={setTripType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trip type" />
                  </SelectTrigger>
                  <SelectContent>
                    {tripTypes.map((trip) => (
                      <SelectItem key={trip.value} value={trip.value}>
                        {trip.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={calculateFare}
              className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
              size="lg"
            >
              Calculate Fare
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            {estimatedFare !== null && (
              <motion.div
                className="mt-6 p-6 bg-secondary/50 rounded-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">
                      Estimated Fare
                    </p>
                    <p className="text-4xl font-bold text-accent">
                      ₹{estimatedFare.toLocaleString()}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      *Includes estimated tolls & driver allowance
                    </p>
                  </div>
                  <Button
                    className="bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                    onClick={handleWhatsAppBooking}
                    disabled={bookingLoading}
                  >
                    {bookingLoading ? "Processing..." : "Book on WhatsApp"}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
