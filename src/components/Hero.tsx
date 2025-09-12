import { TextHoverEffect } from "./ui/texthover";
import giphy from "../assets/litong.png";
import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { ContainerTextFlip } from "./ui/container-text-flip";
import LightRays from "./LightRays";
import ProfileCard from "./ProfileCard";
import { OrbitingCircles as MagicOrbit } from "./magicui/orbiting-circles";
import TailwindIcon from "../assets/tech/file-type-tailwind-icon-original.svg";
import GitIcon from "../assets/tech/git-icon-icon-original.svg";
import GitHubIcon from "../assets/tech/github-mark-white.svg";
import JSIcon from "../assets/tech/js-icon-original.svg";
import NextJSIcon from "../assets/tech/nextjs-icon.svg";
import ReactIcon from "../assets/tech/react-logo.svg";
import SupabaseIcon from "../assets/tech/supabase-logo.svg";
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

// Soft animated aurora/glow used behind the profile image
const auroraAnimate = {
  x: [0, 15, -10, 0],
  y: [0, -10, 10, 0],
  rotate: [0, 10, -8, 0],
  transition: {
    duration: 10,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut",
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

  // Transform values for different parallax layers

  return (
    <section
      id="home"
      className="section min-h-screen !px-[25px] md:!px-8 -mt-52 lg:-mt-44 relative overflow-hidden"
    >
      <LightRays
        className="fixed inset-0 z-[8]"
        raysOrigin="top-center"
        followMouse={true}
        mouseInfluence={0.12}
        raysSpeed={0.8}
        lightSpread={1}
        rayLength={1.6}
        fadeDistance={1}
        saturation={0.95}
        noiseAmount={0.03}
        raysColor={"#4deeea"}
        distortion={0.08}
      />
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen w-full">
        {/* Left Side - Text Effect and Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center gap-8">
          {/* GIF Image for Mobile */}
          <div
            className="lg:hidden w-full flex justify-center mb-8"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <motion.div className="relative w-96 h-96">
              <motion.div
                className="absolute inset-0 -z-10"
                animate={auroraAnimate}
              >
                <motion.div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4deeea]/30 blur-3xl" />
                <motion.div className="absolute left-1/3 top-1/4 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/25 blur-3xl mix-blend-screen" />
                <motion.div className="absolute left-2/3 top-2/3 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl mix-blend-screen" />
              </motion.div>
              <div className="absolute inset-0 z-[0] zoom-in">
                <MagicOrbit
                  className="w-full h-full"
                  radius={140}
                  iconSize={36}
                  speed={25}
                >
                  <img src={ReactIcon} alt="React" className="w-6 h-6" />
                  <img src={NextJSIcon} alt="Next.js" className="w-6 h-6" />
                  <img src={TailwindIcon} alt="Tailwind" className="w-6 h-6" />
                  <img src={JSIcon} alt="JavaScript" className="w-6 h-6" />
                  <img src={GitHubIcon} alt="GitHub" className="w-6 h-6" />
                  <img src={GitIcon} alt="Git" className="w-6 h-6" />
                  <img src={SupabaseIcon} alt="Supabase" className="w-6 h-6" />
                </MagicOrbit>
              </div>
              <motion.div
                className="w-full h-full flex items-center justify-center"
                animate={{
                  scale: imageHovered ? 1.05 : 1,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                <ProfileCard avatarUrl={giphy} />
              </motion.div>
            </motion.div>
          </div>

          {/* Content Container */}
          <div className="max-w-lg ml-0 -mt-10 lg:mt-10 lg:ml-[121px] text-center lg:text-left">
            <div data-aos="fade-up">
              <span className="text-xl text-cosmic-cyan font-medium">
                Hello there, I'm
              </span>
            </div>

            <motion.h1 className="text-5xl md:text-7xl font-bold mb-2 mt-2 tracking-tight relative">
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
              >
                <ContainerTextFlip words={["Developer", "Designer"]} />
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
          <motion.div className="relative w-[500px] h-[500px]">
            <motion.div
              className="absolute inset-0 -z-10"
              animate={auroraAnimate}
            >
              <motion.div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4deeea]/25 blur-3xl" />
              <motion.div className="absolute left-1/4 top-1/3 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/20 blur-3xl mix-blend-screen" />
              <motion.div className="absolute left-2/3 top-2/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl mix-blend-screen" />
            </motion.div>
            <div className="absolute inset-0 z-[0] zoom-in">
              <MagicOrbit
                className="w-full h-full"
                radius={200}
                iconSize={44}
                speed={25}
              >
                <img src={ReactIcon} alt="React" className="w-8 h-8" />
                <img src={NextJSIcon} alt="Next.js" className="w-8 h-8" />
                <img src={TailwindIcon} alt="Tailwind" className="w-8 h-8" />
                <img src={JSIcon} alt="JavaScript" className="w-8 h-8" />
                <img src={GitHubIcon} alt="GitHub" className="w-8 h-8" />
                <img src={GitIcon} alt="Git" className="w-8 h-8" />
                <img src={SupabaseIcon} alt="Supabase" className="w-8 h-8" />
              </MagicOrbit>
            </div>
            <motion.div
              className="w-full h-full flex items-center justify-center"
              animate={{
                scale: imageHovered ? 1.05 : 1,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <ProfileCard avatarUrl={giphy} iconUrl="/pattern-icon.png" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
