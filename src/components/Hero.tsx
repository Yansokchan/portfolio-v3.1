import { TextHoverEffect } from "./ui/texthover";
import pf from "../assets/pf.png";
import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
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
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the viewport
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Normalize values between -1 and 1
      const normalizedX = (e.clientX - centerX) / centerX;
      const normalizedY = (e.clientY - centerY) / centerY;

      smoothMouseX.set(normalizedX);
      smoothMouseY.set(normalizedY);
      setMousePosition({ x: normalizedX, y: normalizedY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [smoothMouseX, smoothMouseY]);

  // Transform values for different parallax layers
  const titleX = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
  const titleY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  const subtitleX = useTransform(smoothMouseX, [-1, 1], [-15, 15]);
  const subtitleY = useTransform(smoothMouseY, [-1, 1], [-10, 10]);

  const textX = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const textY = useTransform(smoothMouseY, [-1, 1], [-5, 5]);

  const buttonX = useTransform(smoothMouseX, [-1, 1], [-25, 25]);
  const buttonY = useTransform(smoothMouseY, [-1, 1], [-20, 20]);

  // Profile image hover animations
  const imageRotateX = useTransform(smoothMouseY, [-1, 1], [15, -15]);
  const imageRotateY = useTransform(smoothMouseX, [-1, 1], [-15, 15]);

  return (
    <section
      id="home"
      className="section min-h-screen !px-[25px] md:!px-8 -mt-32 md:-mt-44 relative overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen w-full">
        {/* Left Side - Text Effect and Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center gap-8">
          {/* Text Effect Container */}
          <div className="w-full max-w-2xl">
            <TextHoverEffect text="ATONG" />
          </div>

          {/* Profile Image for Mobile */}
          <div className="lg:hidden w-full flex justify-center mb-8">
            <motion.div
              className="relative w-52 h-52"
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
                {/* Background blur effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cosmic-cyan to-cosmic-purple rounded-full blur-3xl" />
                {/* Border gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-cosmic-cyan to-cosmic-purple rounded-full" />
                {/* Main image container with dark background */}
                <div className="absolute inset-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full overflow-hidden">
                  <img
                    src={pf}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Blink effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 z-20"
                  animate={{
                    opacity: imageHovered ? [0, 0.15, 0] : 0,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Content Container */}
          <div className="max-w-2xl text-center lg:text-left">
            <div data-aos="fade-up">
              <span className="text-lg text-cosmic-cyan font-medium">
                Hello there, I'm
              </span>
            </div>

            <motion.h1
              style={{
                x: titleX,
                y: titleY,
                rotateX: useTransform(smoothMouseY, [-1, 1], [4, -4]),
                rotateY: useTransform(smoothMouseX, [-1, 1], [-4, 4]),
              }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight relative"
            >
              <motion.span
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-delay="600"
                className="text-gradient inline-block"
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
              </motion.span>
              <motion.span
                data-aos="fade-right"
                data-aos-delay="1200"
                className="text-white inline-block"
                style={{
                  textShadow: useTransform(
                    smoothMouseY,
                    [-1, 1],
                    [
                      "2px 2px 20px rgba(255, 255, 255, 0.2)",
                      "-2px -2px 20px rgba(255, 255, 255, 0.2)",
                    ]
                  ),
                }}
              >
                Developer
              </motion.span>
            </motion.h1>

            <motion.p
              data-aos="fade-up"
              data-aos-delay="1500"
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              I build immersive digital experiences with cutting-edge web
              technologies and creative design solutions.
            </motion.p>
          </div>
        </div>

        {/* Right Side - Profile Image (Desktop) */}
        <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center p-4">
          <motion.div
            className="relative w-72 h-72"
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
              {/* Background blur effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cosmic-cyan to-cosmic-purple rounded-full blur-3xl" />
              {/* Border gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-cosmic-cyan to-cosmic-purple rounded-full" />
              {/* Main image container with dark background */}
              <div className="absolute inset-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full overflow-hidden">
                <img
                  src={pf}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Blink effect overlay */}
              <motion.div
                className="absolute inset-0 bg-white opacity-0 z-20"
                animate={{
                  opacity: imageHovered ? [0, 0.15, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
