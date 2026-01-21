import { motion } from "framer-motion";
import { Plane, MapPin, Car, Calendar, Building2, Users } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Plane,
    title: "Airport Transfers",
    description: "Punctual pickups & drop-offs at Delhi IGI Airport. Track your flight, no waiting charges for delays.",
    price: "From ₹800",
  },
  {
    icon: MapPin,
    title: "Outstation Rides",
    description: "Travel to Jaipur, Agra, Haridwar & more. One-way and round-trip options available.",
    price: "₹12/km",
  },
  {
    icon: Car,
    title: "Local City Tours",
    description: "Explore Delhi's heritage sites, markets, and attractions with our knowledgeable drivers.",
    price: "₹1,500/8hrs",
  },
  {
    icon: Calendar,
    title: "One-Day Rentals",
    description: "Rent a car with driver for weddings, events, or business meetings. Flexible packages.",
    price: "From ₹2,000",
  },
  {
    icon: Building2,
    title: "Corporate Travel",
    description: "Reliable transportation for businesses. Monthly packages and dedicated account managers.",
    price: "Custom",
  },
  {
    icon: Users,
    title: "Multi-Day Tours",
    description: "Plan your dream vacation with multi-day tour packages across North India.",
    price: "₹3,500/day",
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider">
            What We Offer
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From quick airport transfers to multi-day tours, we provide reliable 
            and comfortable transportation solutions for all your travel needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-accent/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-6 h-6 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-accent font-semibold">{service.price}</span>
                <Link
                  to="/services"
                  className="text-sm font-medium text-primary hover:text-accent transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
