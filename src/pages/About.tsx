import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Award, Users, MapPin, Heart, Clock, Shield } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Our Story
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-6">
              About Sonu Mandal Cab Services
            </h1>
            <p className="text-lg text-primary-foreground/80">
              From a single car to a fleet of well-maintained vehicles, 
              our journey has been driven by trust, reliability, and 
              customer satisfaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Our Journey Began in 2008
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm Sonu Mandal, founder of Sonu Mandal Cab Services. What started 
                  as a single car operation from Karol Bagh, Delhi, has grown into 
                  one of the most trusted cab service providers in Delhi NCR.
                </p>
                <p>
                  Coming from a humble background, I understood the value of honest 
                  work and customer trust. When I started driving cabs in 2008, I made 
                  a promise to myself – every customer would reach their destination 
                  safely, on time, and with a smile.
                </p>
                <p>
                  Over 15 years later, that promise hasn't changed. Today, with a fleet 
                  of 10+ vehicles and a team of experienced drivers, we continue to 
                  serve thousands of satisfied customers across Delhi, NCR, and beyond.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-secondary rounded-2xl p-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                Our Core Values
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Shield, title: "Safety First", text: "All vehicles are fully insured with regular maintenance checks" },
                  { icon: Clock, title: "Punctuality", text: "We value your time as much as you do" },
                  { icon: Heart, title: "Customer Care", text: "Personalized service for every booking" },
                  { icon: Award, title: "Quality", text: "Clean, well-maintained vehicles always" },
                ].map((value) => (
                  <div key={value.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "15,000+", label: "Happy Customers" },
              { icon: MapPin, value: "50+", label: "Cities Covered" },
              { icon: Clock, value: "15+", label: "Years in Business" },
              { icon: Award, value: "10+", label: "Vehicles in Fleet" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <stat.icon className="w-8 h-8 mx-auto text-accent mb-3" />
                <p className="text-3xl font-bold font-display text-foreground">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Meet Our Team
            </span>
            <h2 className="font-display text-3xl font-bold text-foreground mt-2 mb-4">
              Experienced & Professional Drivers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All our drivers are verified, experienced, and trained to provide 
              the best service. They know Delhi NCR routes like the back of their hand.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sonu Mandal", role: "Founder & Lead Driver", experience: "15+ years" },
              { name: "Ramesh Singh", role: "Senior Driver", experience: "10+ years" },
              { name: "Vikram Kumar", role: "Fleet Manager", experience: "8+ years" },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-card rounded-xl p-6 text-center shadow-card border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-accent font-medium text-sm">{member.role}</p>
                <p className="text-muted-foreground text-sm mt-2">
                  Experience: {member.experience}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
