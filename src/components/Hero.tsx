
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  const calculateTransform = (factor = 15) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const moveX = (mousePosition.x - centerX) / factor;
    const moveY = (mousePosition.y - centerY) / factor;
    
    return { moveX, moveY };
  };
  
  const { moveX, moveY } = calculateTransform();

  return (
    <section id="home" className="section flex flex-col justify-center items-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center z-10"
      >
        <motion.div
          style={{ 
            transform: `translate(${moveX * 0.5}px, ${moveY * 0.5}px)` 
          }}
          transition={{ type: "spring", stiffness: 75 }}
          className="mb-6 inline-block"
        >
          <span className="text-lg text-cosmic-cyan font-medium">Hello there, I'm</span>
        </motion.div>
        
        <motion.h1
          style={{ 
            transform: `translate(${moveX * 0.3}px, ${moveY * 0.3}px)` 
          }}
          transition={{ type: "spring", stiffness: 75 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-glow"
        >
          <span className="text-gradient">Creative </span>
          <span className="text-white">Developer</span>
        </motion.h1>
        
        <motion.p
          style={{ 
            transform: `translate(${moveX * 0.2}px, ${moveY * 0.2}px)` 
          }}
          transition={{ type: "spring", stiffness: 75 }}
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          I build immersive digital experiences with cutting-edge web technologies and 
          creative design solutions.
        </motion.p>
        
        <motion.div
          style={{ 
            transform: `translate(${moveX * 0.4}px, ${moveY * 0.4}px)` 
          }}
          transition={{ type: "spring", stiffness: 75 }}
        >
          <button className="px-8 py-3 rounded-full bg-cosmic-purple text-white hover:bg-cosmic-purple/90 transition-all duration-300 hover:shadow-lg hover:shadow-cosmic-purple/20 neon-border">
            View My Work
          </button>
        </motion.div>
      </motion.div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cosmic-cyan animate-bounce">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 5v14"/>
          <path d="m19 12-7 7-7-7"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
