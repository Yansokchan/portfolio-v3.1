import React from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code2, Layout, Monitor, BookOpen } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "UI/UX Design",
      description:
        "Creating intuitive and visually appealing user interfaces with a focus on user experience. Specializing in modern design principles and accessibility standards.",
      icon: Layout,
    },
    {
      title: "Web Application",
      description:
        "Building robust and scalable web applications using modern technologies. From frontend to backend, ensuring high performance and maintainability.",
      icon: Monitor,
    },
    {
      title: "Web Fundamentals",
      description:
        "Teaching the core building blocks of web development: HTML, CSS, and JavaScript. Helping beginners understand the fundamentals and best practices of web development.",
      icon: BookOpen,
    },
  ];

  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section id="services" className="section !px-[25px] md:!px-8">
      <div className="max-w-7xl mx-auto py-20">
        <div className="text-center mb-16">
          <h2
            data-aos="zoom-in"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span data-aos="fade-right">My </span>
            <span data-aos="fade-left" className="text-gradient">
              Services
            </span>
          </h2>
          <p data-aos="fade-up" className="text-gray-300 max-w-2xl mx-auto">
            Explore the range of services I offer to bring your digital ideas to
            life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              data-aos={index % 2 === 0 ? "fade-up-right" : "fade-up-left"}
              data-aos-duration="600"
              className="relative bg-gradient-to-br from-cosmic-cyan/20 to-cosmic-purple/20 rounded-2xl shadow-lg overflow-hidden group duration-300 hover:scale-[1.03] hover:shadow-[0_0_0_4px_rgba(34,211,238,0.25),0_0_24px_8px_rgba(168,85,247,0.18)]"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cosmic-cyan/30 to-cosmic-purple/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 text-cosmic-cyan" />
                  </div>
                  <h3 className="text-xl font-bold text-cosmic-cyan">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
