import { motion } from "framer-motion";
import { Shield, Clock, ThumbsUp, Award, Users, MapPin } from "lucide-react";

const stats = [
  { icon: Users, value: "15,000+", label: "Happy Customers" },
  { icon: MapPin, value: "50+", label: "Cities Covered" },
  { icon: Clock, value: "15+", label: "Years Experience" },
  { icon: Award, value: "4.9★", label: "Average Rating" },
];

const trustBadges = [
  { icon: Shield, text: "Fully Insured Vehicles" },
  { icon: ThumbsUp, text: "Verified Drivers" },
  { icon: Clock, text: "24/7 Support" },
  { icon: Award, text: "Best Price Guarantee" },
];

export function TrustSection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <stat.icon className="w-8 h-8 mx-auto text-accent mb-3" />
              <p className="text-3xl md:text-4xl font-bold font-display mb-1">
                {stat.value}
              </p>
              <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Why Choose Us?
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            We prioritize your safety and comfort above everything. Here's what 
            sets us apart from the rest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.text}
              className="flex items-center gap-3 p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <badge.icon className="w-5 h-5 text-accent" />
              </div>
              <span className="font-medium">{badge.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
