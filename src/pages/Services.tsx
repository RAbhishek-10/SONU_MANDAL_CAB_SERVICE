import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Plane, MapPin, Car, Calendar, Building2, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Plane,
    title: "Airport Transfers",
    description: "Reliable airport pickup and drop services at Delhi IGI Airport (Terminal 1, 2 & 3). We track your flight and adjust pickup time accordingly.",
    features: [
      "Meet & greet service",
      "Flight tracking included",
      "No waiting charges for delays up to 45 mins",
      "24/7 availability",
    ],
    fares: [
      { route: "IGI Airport to South Delhi", price: "₹800" },
      { route: "IGI Airport to Gurgaon", price: "₹900" },
      { route: "IGI Airport to Noida", price: "₹1,100" },
    ],
  },
  {
    icon: MapPin,
    title: "Outstation Rides",
    description: "Travel beyond Delhi to popular destinations like Jaipur, Agra, Haridwar, Rishikesh, Chandigarh, and more. One-way and round-trip options.",
    features: [
      "Per km billing - transparent pricing",
      "Driver accommodation included in round trips",
      "Toll & parking included",
      "Multiple vehicle options",
    ],
    fares: [
      { route: "Delhi to Agra (one way)", price: "₹3,500" },
      { route: "Delhi to Jaipur (one way)", price: "₹5,500" },
      { route: "Delhi to Haridwar (one way)", price: "₹5,000" },
    ],
  },
  {
    icon: Car,
    title: "Local City Tours",
    description: "Explore Delhi's rich heritage with our local tour packages. Visit India Gate, Red Fort, Qutub Minar, Lotus Temple, and more.",
    features: [
      "Flexible 4hr, 8hr, or full day packages",
      "Knowledgeable drivers",
      "AC vehicles only",
      "Customizable itinerary",
    ],
    fares: [
      { route: "4 Hours / 40 KM", price: "₹1,000" },
      { route: "8 Hours / 80 KM", price: "₹1,800" },
      { route: "Full Day / 120 KM", price: "₹2,500" },
    ],
  },
  {
    icon: Calendar,
    title: "One-Day Rentals",
    description: "Need a car for the day? Rent with driver for weddings, business meetings, events, or personal use. Flexible packages to suit your needs.",
    features: [
      "Wedding car decoration available",
      "Corporate packages",
      "Event transportation",
      "Flexible timings",
    ],
    fares: [
      { route: "Sedan (8 hours)", price: "₹2,000" },
      { route: "Innova (8 hours)", price: "₹3,500" },
      { route: "Tempo Traveller (8 hours)", price: "₹6,000" },
    ],
  },
  {
    icon: Users,
    title: "Multi-Day Tours",
    description: "Plan your dream vacation with our multi-day tour packages. We cover Rajasthan, Golden Triangle, Himachal, Uttarakhand, and more.",
    features: [
      "Driver stays with you throughout",
      "Vehicle parking at hotels",
      "Night halt charges included",
      "Flexible itinerary",
    ],
    fares: [
      { route: "Golden Triangle (3 days)", price: "₹12,000" },
      { route: "Rajasthan Tour (5 days)", price: "₹20,000" },
      { route: "Himachal Tour (5 days)", price: "₹22,000" },
    ],
  },
  {
    icon: Building2,
    title: "Corporate Travel",
    description: "Reliable transportation solutions for businesses. Monthly packages, dedicated account managers, and flexible billing.",
    features: [
      "Dedicated fleet",
      "Monthly billing",
      "24/7 availability",
      "Corporate discounts",
    ],
    fares: [
      { route: "Sedan (monthly)", price: "₹45,000" },
      { route: "Innova (monthly)", price: "₹65,000" },
      { route: "Per trip billing", price: "Custom" },
    ],
  },
];

export default function Services() {
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
              What We Offer
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-6">
              Our Services
            </h1>
            <p className="text-lg text-primary-foreground/80">
              From quick airport transfers to multi-day tours, we provide 
              reliable transportation solutions for all your travel needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-accent" />
                      </div>
                      <h2 className="font-display text-2xl font-bold text-foreground">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    <h4 className="font-semibold text-foreground mb-3">
                      What's Included:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-secondary/50 rounded-xl p-6">
                    <h4 className="font-semibold text-foreground mb-4">
                      Sample Fares
                    </h4>
                    <div className="space-y-3 mb-6">
                      {service.fares.map((fare) => (
                        <div key={fare.route} className="flex justify-between items-center">
                          <span className="text-muted-foreground text-sm">{fare.route}</span>
                          <span className="font-semibold text-accent">{fare.price}</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href={`https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20book%20${encodeURIComponent(service.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        Book Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
