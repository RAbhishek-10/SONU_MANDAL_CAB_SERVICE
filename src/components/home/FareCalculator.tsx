import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

type CarConfig = {
  value: string;
  label: string;
  baseHours: number;
  baseKm: number;
  baseFare: number;
  extraHour: number;
  extraKm: number;
  nightCharge: number;
};

const carTypes: CarConfig[] = [
  {
    value: "swift-dzire",
    label: "Swift Dzire",
    baseHours: 8,
    baseKm: 80,
    baseFare: 2000,
    extraHour: 250,
    extraKm: 13,
    nightCharge: 200,
  },
  {
    value: "ertiga",
    label: "Ertiga",
    baseHours: 8,
    baseKm: 80,
    baseFare: 3000,
    extraHour: 300,
    extraKm: 15,
    nightCharge: 350,
  },
  {
    value: "innova-crysta",
    label: "Innova Crysta",
    baseHours: 12,
    baseKm: 120,
    baseFare: 6000,
    extraHour: 600,
    extraKm: 25,
    nightCharge: 550,
  },
];

export function FareCalculator() {
  const { toast } = useToast();
  const [distance, setDistance] = useState<number>(80);
  const [hours, setHours] = useState<number>(carTypes[0].baseHours);
  const [carType, setCarType] = useState<string>(carTypes[0].value);
  const [includesNightCharge, setIncludesNightCharge] = useState(false);
  const [includeGst, setIncludeGst] = useState(false);
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [fareBreakdown, setFareBreakdown] = useState<{
    baseFare: number;
    extraHours: number;
    extraHoursCharge: number;
    extraKm: number;
    extraKmCharge: number;
    nightCharge: number;
    subtotal: number;
    gstAmount: number;
    total: number;
  } | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  const selectedCar = useMemo(
    () => carTypes.find((c) => c.value === carType) ?? carTypes[0],
    [carType]
  );

  const calculateFare = () => {
    const car = selectedCar;

    if (!car) return;

    if (Number.isNaN(hours) || Number.isNaN(distance) || hours < 0 || distance < 0) {
      toast({
        title: "Invalid input",
        description: "Please enter non-negative numbers for hours and distance.",
        variant: "destructive",
      });
      return;
    }

    if (hours === 0 || distance === 0) {
      toast({
        title: "Missing values",
        description: "Please enter both duration in hours and distance in km.",
        variant: "destructive",
      });
      return;
    }

    const extraHours = Math.max(0, hours - car.baseHours);
    const extraKm = Math.max(0, distance - car.baseKm);
    const extraHoursCharge = extraHours * car.extraHour;
    const extraKmCharge = extraKm * car.extraKm;
    const nightCharge = includesNightCharge ? car.nightCharge : 0;

    const subtotal = car.baseFare + extraHoursCharge + extraKmCharge + nightCharge;
    const gstAmount = includeGst ? Math.round(subtotal * 0.05) : 0;
    const total = Math.round(subtotal + gstAmount);

    setEstimatedFare(total);
    setFareBreakdown({
      baseFare: car.baseFare,
      extraHours,
      extraHoursCharge,
      extraKm,
      extraKmCharge,
      nightCharge,
      subtotal,
      gstAmount,
      total,
    });
  };

  const handleWhatsAppBooking = async () => {
    if (!estimatedFare || distance <= 0 || hours <= 0) {
      toast({
        title: "Cannot proceed",
        description: "Please calculate a valid fare before booking.",
        variant: "destructive",
      });
      return;
    }

    const car = selectedCar;
    const carLabel = car ? car.label : carType;

    const fallbackUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
      `Hi, I need a ${carLabel} for ${hours} hours and ${distance}km. Night travel: ${
        includesNightCharge ? "Yes" : "No"
      }. GST included: ${includeGst ? "Yes" : "No"}. Estimated fare: ₹${estimatedFare}`
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
          carType: carLabel,
          distanceKm: distance,
          estimatedFare,
          notes: `Package: ${carLabel}, ${hours} hours, ${distance} km, Night travel: ${
            includesNightCharge ? "Yes" : "No"
          }, GST included: ${includeGst ? "Yes" : "No"}.`,
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
              Get an instant estimate for your package. Final fare may vary based on
              actual usage and any additional charges.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="hours">Duration (hours)</Label>
                <Input
                  id="hours"
                  type="number"
                  placeholder="e.g., 8"
                  value={hours || ""}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="text-lg"
                  min={0}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="distance">Distance (km)</Label>
                <Input
                  id="distance"
                  type="number"
                  placeholder="e.g., 80"
                  value={distance || ""}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="text-lg"
                  min={0}
                />
              </div>

              <div className="space-y-2">
                <Label>Car Type</Label>
                <Select
                  value={carType}
                  onValueChange={(value) => {
                    setCarType(value);
                    const car = carTypes.find((c) => c.value === value);
                    if (car) {
                      setHours(car.baseHours);
                      setDistance(car.baseKm);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select car" />
                  </SelectTrigger>
                  <SelectContent>
                    {carTypes.map((car) => (
                      <SelectItem key={car.value} value={car.value}>
                        {car.label} - {car.baseHours}h / {car.baseKm}km ₹{car.baseFare}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="night-travel">Night Travel</Label>
                  <p className="text-xs text-muted-foreground">
                    Add fixed night charge as per selected vehicle.
                  </p>
                </div>
                <Switch
                  id="night-travel"
                  checked={includesNightCharge}
                  onCheckedChange={setIncludesNightCharge}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="include-gst">Include 5% GST</Label>
                  <p className="text-xs text-muted-foreground">
                    Show fare with GST for invoice-ready estimate.
                  </p>
                </div>
                <Switch
                  id="include-gst"
                  checked={includeGst}
                  onCheckedChange={setIncludeGst}
                />
              </div>
            </div>

            <Button
              onClick={calculateFare}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              Calculate Fare
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            {fareBreakdown && estimatedFare !== null && (
              <motion.div
                className="mt-6 p-6 bg-secondary/50 rounded-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base fare</span>
                      <span className="font-medium">₹{fareBreakdown.baseFare.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Extra hours ({fareBreakdown.extraHours} h)
                      </span>
                      <span className="font-medium">
                        ₹{fareBreakdown.extraHoursCharge.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Extra km ({fareBreakdown.extraKm} km)
                      </span>
                      <span className="font-medium">
                        ₹{fareBreakdown.extraKmCharge.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Night charge</span>
                      <span className="font-medium">
                        ₹{fareBreakdown.nightCharge.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2 mt-2">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">
                        ₹{fareBreakdown.subtotal.toLocaleString()}
                      </span>
                    </div>
                    {fareBreakdown.gstAmount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">GST (5%)</span>
                        <span className="font-semibold">
                          ₹{fareBreakdown.gstAmount.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-border pt-2 mt-2">
                      <span className="text-sm font-semibold">Total</span>
                      <span className="text-2xl font-bold text-accent">
                        ₹{fareBreakdown.total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-xs">
                        This is an estimate based on selected package, extra hours, extra km, and
                        night/GST options. Final fare may vary slightly based on actual usage.
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
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
