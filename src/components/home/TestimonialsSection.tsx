import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Delhi",
    rating: 5,
    text: "Booked Innova for my family trip to Agra. Driver was very professional and the car was spotless. Reached on time despite heavy traffic. Highly recommended!",
    trip: "Delhi to Agra",
  },
  {
    name: "Priya Sharma",
    location: "Gurgaon",
    rating: 5,
    text: "Regular customer for airport pickups. They never disappoint. Always on time, clean cars, and polite drivers. Sonu ji personally ensures quality service.",
    trip: "Airport Transfer",
  },
  {
    name: "Amit Verma",
    location: "Noida",
    rating: 5,
    text: "Used their services for my wedding. Booked multiple cars for 3 days. Everything was perfectly coordinated. The team went above and beyond!",
    trip: "Wedding Service",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider">
            Customer Reviews
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-card rounded-xl p-6 shadow-card border border-border relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Quote className="w-8 h-8 text-accent/20 absolute top-4 right-4" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-accent text-accent"
                  />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.location}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                  {testimonial.trip}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
