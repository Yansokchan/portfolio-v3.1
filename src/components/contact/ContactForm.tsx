import type React from "react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FaPaperPlane } from "react-icons/fa";
import CreditsButton from "@/components/CreditsButton";
import { triggerConfettiSideCannons } from "@/lib/confetti";
import ToastFloatingPoints from "@/components/ui/ToastFloatingPoints";

const ContactForm = ({
  onMouseMove,
  setIsHovered,
}: {
  onMouseMove: (e: React.MouseEvent<HTMLFormElement>) => void;
  setIsHovered: (isHovered: boolean) => void;
}) => {
  const { toast } = useToast();
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "68a4d70f-7e45-422f-bf56-42afeed37f1c",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "New Contact Form Submission",
        }),
      });

      const result = await response.json();
      if (result.success) {
        triggerConfettiSideCannons();
        toast({
          title: "Message Sent Successfully! 🚀",
          description: (
            <div className="flex flex-col gap-1 relative z-10">
              <p className="font-medium">
                Thank you for reaching out,{" "}
                <span className="text-white font-bold">{formData.name}!</span>
              </p>
              <p className="text-sm text-gray-200">
                I'll get back to you as soon as possible.
              </p>
              <ToastFloatingPoints />
            </div>
          ),
          style: {
            background: `radial-gradient(65.28% 65.28% at 50% 100%, rgba(223, 113, 255, 0.8) 0%, rgba(223, 113, 255, 0) 100%), linear-gradient(0deg, #7a5af8, #7a5af8)`,
            border: "none",
            color: "white",
            overflow: "hidden", // Ensure points don't spill out
          },
        });
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Oops! Something went wrong 😕",
        description: (
          <div className="flex flex-col gap-1">
            <p className="font-medium">Failed to send your message.</p>
            <p className="text-sm text-gray-400">
              Please try again or contact me directly via email.
            </p>
          </div>
        ),
        variant: "destructive",
        className: "bg-red-500/50 border border-red-500 backdrop-blur-sm",
      });
    } finally {
      setIsContactLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleContactSubmit}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <div className="mb-5 md:mb-6">
        <label
          data-aos="fade-right"
          data-aos-delay="300"
          htmlFor="name"
          className="block text-gray-400 text-sm mb-2"
        >
          Name*
        </label>
        <input
          data-aos="fade-up"
          data-aos-delay="300"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cosmic-cyan transition-colors"
          required
        />
      </div>

      <div className="mb-5 md:mb-6">
        <label
          data-aos="fade-right"
          data-aos-delay="300"
          htmlFor="email"
          className="block text-gray-400 text-sm mb-2"
        >
          Email*
        </label>
        <input
          data-aos="fade-up"
          data-aos-delay="300"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cosmic-cyan transition-colors"
          required
        />
      </div>

      <div className="mb-5 md:mb-6">
        <label
          data-aos="fade-right"
          data-aos-delay="300"
          htmlFor="message"
          className="block text-gray-400 text-sm mb-2"
        >
          Message*
        </label>
        <textarea
          data-aos="fade-up"
          data-aos-delay="300"
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cosmic-cyan transition-colors resize-none"
          required
        />
      </div>

      <CreditsButton
        data-aos="fade-up"
        data-aos-delay="300"
        type="submit"
        disabled={isContactLoading}
        text={isContactLoading ? "Sending..." : "Send Message"}
        className="w-full"
        icon={<FaPaperPlane className="text-sm" />}
      />
    </form>
  );
};

export default ContactForm;
