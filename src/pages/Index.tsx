import { useRef } from "react";
import Nav from "@/components/Nav";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import { Tracing } from "@/components/ui/tracing";

const Index = () => {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-cosmic-dark text-white">
      {/* 3D Background Experience */}
      <Experience />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Content */}
      <div className="relative z-10">
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
