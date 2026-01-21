import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Users, Fuel, Snowflake, Briefcase } from "lucide-react";
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
}

const cars: CarData[] = [
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
    features: ["Captain seats", "Rear AC", "USB charging", "Extra legroom"],
    condition: "Excellent - 2023 model, well maintained",
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
    features: ["Compact & efficient", "City-friendly", "Good mileage", "Boot space"],
    condition: "Excellent - Regular servicing, sanitized",
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
    features: ["Spacious cabin", "Reliable engine", "Comfortable ride", "Low maintenance"],
    condition: "Very Good - 2022 model",
  },
];

function CarCard({ car }: { car: CarData }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group border border-border"
          whileHover={{ y: -5 }}
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
              {car.category}
            </span>
          </div>
          <div className="p-5">
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              {car.name}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" /> {car.seats}
              </span>
              <span className="flex items-center gap-1">
                <Fuel className="w-4 h-4" /> {car.fuel}
              </span>
              <span className="flex items-center gap-1">
                <Snowflake className="w-4 h-4" /> AC
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-accent font-bold text-lg">₹{car.pricePerKm}/km</span>
                <span className="text-muted-foreground text-sm ml-2">• ₹{car.pricePerDay}/day</span>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{car.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-secondary p-3 rounded-lg">
              <Users className="w-5 h-5 mx-auto text-accent mb-1" />
              <span className="text-sm font-medium">{car.seats} Seats</span>
            </div>
            <div className="bg-secondary p-3 rounded-lg">
              <Fuel className="w-5 h-5 mx-auto text-accent mb-1" />
              <span className="text-sm font-medium">{car.fuel}</span>
            </div>
            <div className="bg-secondary p-3 rounded-lg">
              <Snowflake className="w-5 h-5 mx-auto text-accent mb-1" />
              <span className="text-sm font-medium">AC</span>
            </div>
            <div className="bg-secondary p-3 rounded-lg">
              <Briefcase className="w-5 h-5 mx-auto text-accent mb-1" />
              <span className="text-sm font-medium">{car.luggage} Bags</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Vehicle Condition</h4>
            <p className="text-muted-foreground text-sm">{car.condition}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Features</h4>
            <ul className="grid grid-cols-2 gap-2">
              {car.features.map((feature) => (
                <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <span className="text-2xl font-bold text-accent">₹{car.pricePerKm}/km</span>
              <span className="text-muted-foreground ml-2">or ₹{car.pricePerDay}/day</span>
            </div>
            <a
              href={`https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20book%20${encodeURIComponent(car.name)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Book This Car
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function FleetSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cars.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length);
  };

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Our Fleet
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Choose Your Ride
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Well-maintained, fully insured vehicles for every occasion. 
              From budget-friendly sedans to premium MPVs.
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Button variant="outline" size="lg" asChild>
            <a href="/fleet">View All Vehicles →</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
