import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    pickup: "",
    drop: "",
    date: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappFallbackMessage = `Hi, I want to book a cab.
    
Name: ${formData.name}
Phone: ${formData.phone}
Service: ${formData.service}
Pickup: ${formData.pickup}
Drop: ${formData.drop}
Date: ${formData.date}
Message: ${formData.message}`;

    try {
      setSubmitting(true);

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "contact_form",
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          serviceType: formData.service || "booking",
          pickup: formData.pickup,
          drop: formData.drop,
          pickupDateTime: formData.date,
          notes: formData.message || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const data = (await response.json()) as { whatsappUrl: string };

      window.open(data.whatsappUrl, "_blank");

      toast({
        title: "Booking created",
        description: "Your request is saved and WhatsApp is opening.",
      });
    } catch (error) {
      console.error(error);

      const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
        whatsappFallbackMessage
      )}`;
      window.open(whatsappUrl, "_blank");

      toast({
        title: "Using WhatsApp directly",
        description: "We couldn't reach the server, but WhatsApp is opening.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
              Get in Touch
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-6">
              Contact & Booking
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Ready to book your ride? Fill out the form below or contact us directly. 
              We respond within minutes!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              className="lg:col-span-1 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Contact Information
              </h2>

              <div className="space-y-4">
                <a href="tel:+919876543210" className="flex items-start gap-4 p-4 bg-secondary rounded-xl hover:bg-secondary/70 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Phone (24/7)</p>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-secondary rounded-xl hover:bg-secondary/70 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">WhatsApp</p>
                    <p className="text-muted-foreground">Quick response</p>
                  </div>
                </a>

                <a href="mailto:booking@sonumandal.com" className="flex items-start gap-4 p-4 bg-secondary rounded-xl hover:bg-secondary/70 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground">booking@sonumandal.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-secondary rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Office</p>
                    <p className="text-muted-foreground">Karol Bagh, New Delhi 110005</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-secondary rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Working Hours</p>
                    <p className="text-muted-foreground">24/7 - We never sleep!</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Book Your Ride
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Service Type *</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="airport">Airport Transfer</SelectItem>
                          <SelectItem value="outstation">Outstation Ride</SelectItem>
                          <SelectItem value="local">Local City Tour</SelectItem>
                          <SelectItem value="rental">One-Day Rental</SelectItem>
                          <SelectItem value="tour">Multi-Day Tour</SelectItem>
                          <SelectItem value="corporate">Corporate Travel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup Location *</Label>
                      <Input
                        id="pickup"
                        name="pickup"
                        required
                        value={formData.pickup}
                        onChange={handleChange}
                        placeholder="e.g., IGI Airport T3"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="drop">Drop Location *</Label>
                      <Input
                        id="drop"
                        name="drop"
                        required
                        value={formData.drop}
                        onChange={handleChange}
                        placeholder="e.g., Connaught Place"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Travel Date & Time *</Label>
                    <Input
                      id="date"
                      name="date"
                      type="datetime-local"
                      required
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Requirements</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any special requests? Car preference, extra luggage, etc."
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={submitting}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {submitting ? "Processing..." : "Send Booking Request via WhatsApp"}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Or call us directly at{" "}
                    <a href="tel:+919876543210" className="text-accent font-medium">
                      +91 98765 43210
                    </a>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
