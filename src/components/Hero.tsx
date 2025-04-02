import { useState } from "react";
import { motion } from "framer-motion";
import { TextHoverEffect } from "./ui/texthover";

const Hero = () => {
  const [imageHovered, setImageHovered] = useState(false);

  return (
    <section
      id="home"
      className="section flex flex-col justify-center items-center min-h-screen -mt-20 relative overflow-hidden"
    >
      <TextHoverEffect text="ATONG" />
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-10 z-10 relative">
        {/* Profile Image Container */}
        <motion.div
          className="relative w-52 h-52 md:w-60 md:h-60 "
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onHoverStart={() => setImageHovered(true)}
          onHoverEnd={() => setImageHovered(false)}
        >
          <motion.div
            className="w-full h-full relative rounded-full overflow-hidden"
            animate={{
              scale: imageHovered ? 1.05 : 1,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            {/* Main image with blink effect */}
            <motion.div
              className="w-full h-full rounded-full overflow-hidden glass border-2 border-cosmic-cyan/20"
              animate={{
                boxShadow: imageHovered
                  ? "0 0 20px rgba(77, 238, 234, 0.5)"
                  : "0 0 10px rgba(77, 238, 234, 0.2)",
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <img
                src="../../public/pf.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Blink effect overlay */}
            <motion.div
              className="absolute inset-0 bg-white opacity-0"
              animate={{
                opacity: imageHovered ? [0, 0.3, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
        <div className="max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 inline-block"
          >
            <span className="text-lg text-cosmic-cyan font-medium">
              Hello there, I'm
            </span>
          </motion.div>

          <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight relative">
            <motion.span className="text-gradient inline-block">
              Creative{" "}
            </motion.span>
            <motion.span className="text-white inline-block">
              Developer
            </motion.span>
          </motion.h1>

          <motion.p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            I build immersive digital experiences with cutting-edge web
            technologies and creative design solutions.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
