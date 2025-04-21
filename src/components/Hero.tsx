import { TextHoverEffect } from "./ui/texthover";
import giphy from "../assets/giphy.gif";
import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-20, 20, -20],
    transition: {
      duration: 6,
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

          {/* GIF Image for Mobile */}
          <div
            className="lg:hidden w-full flex justify-center mb-8"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <motion.div
              className="relative w-64 h-64"
              initial="initial"
              animate="animate"
              variants={floatingAnimation}
            >
              <motion.div
                className="w-full h-full"
                animate={{
                  scale: imageHovered ? 1.05 : 1,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                <img
                  src={giphy}
                  alt="Developer Animation"
                  className="w-full h-full object-contain"
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
                data-aos-delay="200"
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
                data-aos-delay="300"
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
              data-aos-delay="400"
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              I build immersive digital experiences with cutting-edge web
              technologies and creative design solutions.
            </motion.p>
          </div>
        </div>

        {/* Right Side - Profile Image (Desktop) */}
        <div
          className="hidden lg:flex w-full lg:w-1/2 items-center justify-center p-4"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          <motion.div
            className="relative w-96 h-96"
            initial="initial"
            animate="animate"
            variants={floatingAnimation}
          >
            <motion.div
              className="w-full h-full"
              animate={{
                scale: imageHovered ? 1.05 : 1,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <img
                src={giphy}
                alt="Developer Animation"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
