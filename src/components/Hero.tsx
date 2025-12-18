import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { ContainerTextFlip } from "./ui/container-text-flip";
import ProfileCard from "./ui/ProfileCard";

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-20, 20, -20],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageHovered, setImageHovered] = useState(false);

  // Smooth spring-based mouse position values
  const smoothMouseX = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  });

  const smoothMouseY = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  });
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section
      id="home"
      className="section min-h-screen !px-[25px] md:!px-8 -mt-52 lg:-mt-44 relative overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen w-full">
        {/* Left Side - Text Effect and Content */}

        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center gap-20">
          {/* GIF Image for Mobile */}
          <div className="lg:hidden flex flex-col items-center justify-center gap-5">
            <ProfileCard />
          </div>

          {/* Content Container */}
          <div className="max-w-lg ml-0 lg:mb-0 lg:ml-[50px] text-center lg:text-left">
            <div data-aos="fade-up">
              <span className="text-xl text-cosmic-cyan font-medium">
                Hello there, I'm
              </span>
            </div>

            <motion.h1 className="text-5xl md:text-7xl font-bold mb-2 mt-2 tracking-tight relative">
              <motion.div
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-delay="200"
                className="text-gradient block lg:inline-block"
                style={{
                  textShadow: useTransform(
                    smoothMouseX,
                    [-1, 1],
                    [
                      "2px 2px 20px rgba(77, 238, 234, 0.3)",
                      "-2px -2px 20px rgba(77, 238, 234, 0.3)",
                    ]
                  ),
                }}
              >
                Creative{" "}
              </motion.div>
              <motion.span
                data-aos="fade-right"
                data-aos-delay="300"
                className="text-white inline-block"
              >
                <ContainerTextFlip
                  words={["Web Developer", "Network Engineer"]}
                />
              </motion.span>
            </motion.h1>

            <motion.p
              data-aos="fade-up"
              data-aos-delay="400"
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Building immersive web experiences & securing enterprise networks
              with cutting-edge solutions.
            </motion.p>
          </div>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 flex-col items-center justify-center p-4 gap-10 relative">
          <ProfileCard />
        </div>
      </div>
    </section>
  );
};

export default Hero;
