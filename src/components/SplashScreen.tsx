import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Github, CodeXml, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { TypewriterEffect, TypewriterEffectSmooth } from "./ui/typewriter.tsx";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision.tsx";
import { FaReact } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io";
import { RiSupabaseFill } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [showSecondTypewriter, setShowSecondTypewriter] = useState(false);

  useEffect(() => {
    const duration = 7000; // 7 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;

    // Custom timing function for more realistic progress
    const getProgressIncrement = (currentProgress: number) => {
      if (currentProgress < 20) {
        return 0.8; // Fast initial progress
      } else if (currentProgress < 40) {
        return 1.2; // Slower
      } else if (currentProgress < 95) {
        return 0.4; // Very slow
      } else {
        return 0.1; // Extremely slow at the end
      }
    };

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + getProgressIncrement(prev);
        if (newProgress >= 100) {
          clearInterval(timer);
          onComplete();
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Start the second typewriter after the first one finishes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondTypewriter(true);
    }, 3000); // Adjust this timing based on your first typewriter's duration

    return () => clearTimeout(timer);
  }, []);

  const words = [
    {
      text: "WELCOME",
    },
    {
      text: "TO",
    },
    {
      text: "THE",
    },
    {
      text: "SOKCHAN.YAN",
      className: "text-gradient",
    },
  ];

  const url = [{ text: "sokchanyan.vercel.app" }];

  return (
    <BackgroundBeamsWithCollision>
      <div className="relative h-full w-full flex items-center justify-center">
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center"
        >
          {/* Decorative elements */}

          {/* Tech Stack Icons */}
          <motion.div
            initial={{ scale: 0, x: -100 }}
            animate={{
              scale: 1,
              x: 0,
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="absolute -top-8 left-[5%] transform -translate-x-1/2"
          >
            <RiNextjsFill className="w-10 h-10 text-white hover:text-gray-400 transition-colors" />
          </motion.div>

          <motion.div
            initial={{ scale: 0, x: -50 }}
            animate={{
              scale: 1,
              x: 0,
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.3,
            }}
            className="absolute -top-8 left-[20%] transform -translate-x-1/2"
          >
            <RiTailwindCssFill className="w-10 h-10 text-cyan-400 hover:text-cyan-600 transition-colors" />
          </motion.div>

          <motion.div
            initial={{ scale: 0, x: -50 }}
            animate={{
              scale: 1,
              x: 0,
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="absolute -top-8 left-[35%] transform -translate-x-1/2"
          >
            <RiSupabaseFill className="w-10 h-10 text-emerald-400 hover:text-emerald-600 transition-colors" />
          </motion.div>

          <motion.div
            initial={{ scale: 0, x: 50 }}
            animate={{
              scale: 1,
              x: 0,
              y: [0, -15, 0],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute -top-8 right-[35%] transform translate-x-1/2"
          >
            <FaNodeJs className="w-10 h-10 text-green-400 hover:text-green-600 transition-colors" />
          </motion.div>

          <motion.div
            initial={{ scale: 0, x: 50 }}
            animate={{
              scale: 1,
              x: 0,
              y: [0, -15, 0],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.6,
            }}
            className="absolute -top-8 right-[20%] transform translate-x-1/2"
          >
            <IoLogoJavascript className="w-10 h-10 text-yellow-400 hover:text-yellow-600 transition-colors" />
          </motion.div>

          <motion.div
            initial={{ scale: 0, x: 100 }}
            animate={{
              scale: 1,
              x: 0,
              y: [0, -15, 0],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.7,
            }}
            className="absolute -top-8 right-[5%] transform translate-x-1/2"
          >
            <FaReact className="w-10 h-10 text-blue-400 hover:text-blue-600 transition-colors" />
          </motion.div>

          <div className="relative">
            <TypewriterEffectSmooth words={words} />
          </div>
          {showSecondTypewriter && (
            <div className="flex justify-center items-center gap-3">
              <Globe className="text-cosmic-cyan" />
              <TypewriterEffect words={url} />
            </div>
          )}
        </motion.div>

        {/* Circular Loading Indicator - Bottom Right */}
        <div className="absolute bottom-8 right-8 w-16 h-16">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              className="text-primary/20"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.1 }}
              transform="rotate(-90 50 50)"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-sm font-bold text-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default SplashScreen;
