import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Users, Fuel, Snowflake, Briefcase, Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import innovaImg from "@/assets/cars/innova.jpg";
import dzireImg from "@/assets/cars/dzire.jpg";
import etiosImg from "@/assets/cars/etios.jpg";

interface CarData {
  id: number;
  name: string;
  category: string;
  image: string;
  seats: number;
  fuel: string;
  ac: boolean;
  luggage: number;
  pricePerKm: number;
  pricePerDay: number;
  features: string[];
  condition: string;
  rating: number;
}

const fleet: CarData[] = [
  {
    id: 1,
    name: "Toyota Innova Crysta",
    category: "Premium MPV",
    image: innovaImg,
    seats: 7,
    fuel: "Diesel",
    ac: true,
    luggage: 4,
    pricePerKm: 16,
    pricePerDay: 3500,
    features: ["Captain seats", "Rear AC vents", "USB charging ports", "Extra legroom", "Push button start", "Cruise control"],
    condition: "Excellent - 2023 model, regular servicing, deep cleaned",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Maruti Swift Dzire",
    category: "Sedan",
    image: dzireImg,
    seats: 4,
    fuel: "Petrol/CNG",
    ac: true,
    luggage: 2,
    pricePerKm: 12,
    pricePerDay: 2000,
    features: ["Compact & efficient", "City-friendly", "Good mileage", "Spacious boot", "Touchscreen infotainment", "Rear parking sensors"],
    condition: "Excellent - Regular servicing, sanitized daily",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Toyota Etios",
    category: "Sedan",
    image: etiosImg,
    seats: 4,
    fuel: "Diesel",
    ac: true,
    luggage: 3,
    pricePerKm: 13,
    pricePerDay: 2200,
    features: ["Spacious cabin", "Reliable engine", "Comfortable ride", "Low maintenance", "Good for outstation", "Ample legroom"],
    condition: "Very Good - 2022 model, well maintained",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Maruti Ertiga",
    category: "MPV",
    image: innovaImg,
    seats: 7,
    fuel: "Petrol/CNG",
    ac: true,
    luggage: 3,
    pricePerKm: 14,
    pricePerDay: 2800,
    features: ["7 seater comfort", "AC vents all rows", "Good mileage", "Family friendly", "Music system", "Power windows"],
    condition: "Excellent - 2023 model",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Honda City",
    category: "Premium Sedan",
    image: dzireImg,
    seats: 4,
    fuel: "Petrol",
    ac: true,
    luggage: 3,
    pricePerKm: 15,
    pricePerDay: 2800,
    features: ["Premium interiors", "Sunroof", "Lane watch camera", "6 airbags", "Cruise control", "Leather seats"],
    condition: "Excellent - 2023 model",
    rating: 4.9,
  },
  {
    id: 6,
    name: "Hyundai Verna",
    category: "Premium Sedan",
    image: etiosImg,
    seats: 4,
    fuel: "Petrol",
    ac: true,
    luggage: 3,
    pricePerKm: 15,
    pricePerDay: 2800,
    features: ["Sporty look", "Ventilated seats", "Wireless charging", "Bose sound system", "ADAS features", "Digital cluster"],
    condition: "Excellent - 2024 model",
    rating: 4.9,
  },
  {
    id: 7,
    name: "Tempo Traveller 12 Seater",
    category: "Tempo",
    image: innovaImg,
    seats: 12,
    fuel: "Diesel",
    ac: true,
    luggage: 8,
    pricePerKm: 22,
    pricePerDay: 6000,
    features: ["Group travel", "AC throughout", "Push back seats", "Ample luggage space", "Music system", "Curtains"],
    condition: "Very Good - Regular maintenance",
    rating: 4.7,
  },
  {
    id: 8,
    name: "Tempo Traveller 17 Seater",
    category: "Tempo",
    image: innovaImg,
    seats: 17,
    fuel: "Diesel",
    ac: true,
    luggage: 12,
    pricePerKm: 26,
    pricePerDay: 8000,
    features: ["Large groups", "Dual AC", "Push back seats", "Luggage carrier", "First aid kit", "Fire extinguisher"],
    condition: "Good - Well maintained",
    rating: 4.6,
  },
  {
    id: 9,
    name: "Mahindra XUV700",
    category: "Premium SUV",
    image: dzireImg,
    seats: 7,
    fuel: "Diesel",
    ac: true,
    luggage: 4,
    pricePerKm: 18,
    pricePerDay: 4000,
    features: ["ADAS Level 2", "Panoramic sunroof", "3D sound system", "Wireless charging", "Digital key", "Driver fatigue alert"],
    condition: "Excellent - 2024 model",
    rating: 4.9,
  },
  {
    id: 10,
    name: "Toyota Fortuner",
    category: "Luxury SUV",
    image: innovaImg,
    seats: 7,
    fuel: "Diesel",
    ac: true,
    luggage: 5,
    pricePerKm: 25,
    pricePerDay: 6500,
    features: ["Premium luxury", "4x4 capable", "Leather interiors", "TPMS", "360 camera", "Powered tailgate"],
    condition: "Excellent - 2023 model, showroom condition",
    rating: 5.0,
  },
];

function CarDetailModal({ car }: { car: CarData }) {
  return (
    <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="font-display text-2xl">{car.name}</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-56 object-cover rounded-lg"
        />
        
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
            {car.category}
          </span>
          <span className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-accent text-accent" />
            {car.rating}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-secondary p-4 rounded-lg text-center">
            <Users className="w-6 h-6 mx-auto text-accent mb-2" />
            <p className="text-sm font-medium">{car.seats} Seats</p>
          </div>
          <div className="bg-secondary p-4 rounded-lg text-center">
            <Fuel className="w-6 h-6 mx-auto text-accent mb-2" />
            <p className="text-sm font-medium">{car.fuel}</p>
          </div>
          <div className="bg-secondary p-4 rounded-lg text-center">
            <Snowflake className="w-6 h-6 mx-auto text-accent mb-2" />
            <p className="text-sm font-medium">AC</p>
          </div>
          <div className="bg-secondary p-4 rounded-lg text-center">
            <Briefcase className="w-6 h-6 mx-auto text-accent mb-2" />
            <p className="text-sm font-medium">{car.luggage} Bags</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-2">Vehicle Condition</h4>
          <p className="text-muted-foreground text-sm">{car.condition}</p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-3">Features & Amenities</h4>
          <div className="grid grid-cols-2 gap-2">
            {car.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="text-2xl font-bold text-accent">
              ₹{car.pricePerKm}/km
            </p>
            <p className="text-sm text-muted-foreground">
              or ₹{car.pricePerDay}/day
            </p>
          </div>
          <a
            href={`https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20book%20${encodeURIComponent(car.name)}.%20Please%20share%20availability.`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              Book This Car
            </Button>
          </a>
        </div>
      </div>
    </DialogContent>
  );
}

export default function Fleet() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Our Vehicles
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-6">
              Our Fleet
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Choose from our range of well-maintained, fully insured vehicles. 
              From budget sedans to luxury SUVs, we have the perfect ride for every need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {fleet.map((car, index) => (
              <Dialog key={car.id}>
                <DialogTrigger asChild>
                  <motion.div
                    className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group border border-border"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                        {car.category}
                      </span>
                      <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-card/90 rounded-full text-xs">
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        {car.rating}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                        {car.name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" /> {car.seats}
                        </span>
                        <span className="flex items-center gap-1">
                          <Fuel className="w-3 h-3" /> {car.fuel}
                        </span>
                        <span className="flex items-center gap-1">
                          <Snowflake className="w-3 h-3" /> AC
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-accent font-bold">
                          ₹{car.pricePerKm}/km
                        </span>
                        <span className="text-xs text-muted-foreground">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </DialogTrigger>
                <CarDetailModal car={car} />
              </Dialog>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
