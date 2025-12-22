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
import { CanvasRevealEffect } from "@/components/ui/CanvasRevealEffect";
import { ShootingStars } from "@/components/ui/shooting-stars";
import AIChatbot from "@/components/AIChatbot";

const Index = () => {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-cosmic-dark text-white">
      {/* 3D Background Experience */}
      <Experience />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Content */}
      <div className="relative z-10">
        <div className="fixed inset-0 z-0">
          <ShootingStars />
        </div>
        <Nav />
        <Hero />
        <About />

        <Projects />
        <Contact />
        <Footer />
      </div>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default Index;
