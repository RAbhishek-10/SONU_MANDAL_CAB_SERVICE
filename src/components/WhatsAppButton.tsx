import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface WhatsAppButtonProps {
  message?: string;
  phoneNumber?: string;
}

export function WhatsAppButton({
  message = "Hi, I want to book a cab",
  phoneNumber = "919876543210",
}: WhatsAppButtonProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const fallbackUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "whatsapp_floating_button",
          name: "Website visitor",
          phone: "0000000000",
          serviceType: "quick_whatsapp",
          pickup: "N/A",
          drop: "N/A",
          pickupDateTime: new Date().toISOString(),
          notes: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const data = (await response.json()) as { whatsappUrl: string };
      window.open(data.whatsappUrl, "_blank");

      toast({
        title: "Enquiry saved",
        description: "Your WhatsApp enquiry is saved and opening now.",
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
      setLoading(false);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden md:inline font-medium">
        {loading ? "Opening..." : "Book Now"}
      </span>
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse-soft" />
    </motion.button>
  );
}

