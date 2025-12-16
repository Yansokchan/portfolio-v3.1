import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Nav from "@/components/Nav";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

const auroraAnimate = {
  x: [0, 25, -25, 0],
  y: [0, -30, 30, 0],
  rotate: [0, 15, -15, 0],
  transition: {
    duration: 10,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut",
  },
};

const Index = () => {
  const { scrollY, scrollX } = useScroll();
  const auroraY = useTransform(scrollY, [0, 1000], [0, 500]);
  const auroraX = useTransform(scrollX, [0, 1000], [0, 500]);
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-cosmic-dark text-white">
      
      {/* 3D Background Experience */}
      <Experience />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Content */}
      <div className="relative z-10">
        {/* Global Scroll-Triggered Aurora Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ y: auroraY, x: scrollX }}
      >
        <motion.div className="w-full h-full" animate={auroraAnimate}>
          <motion.div className="absolute left-[20%] top-[20%] h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4deeea]/20 blur-[100px]" />
          <motion.div className="absolute right-[20%] top-[40%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/30 blur-[100px] mix-blend-screen" />
          <motion.div className="absolute left-[40%] bottom-[20%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/30 blur-[100px] mix-blend-screen" />
        </motion.div>
      </motion.div>
     
        <Nav />
        <Hero />
        <About />

        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
