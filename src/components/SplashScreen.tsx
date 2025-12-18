import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeXml, Github, Globe, User } from "lucide-react";
import { ShootingStars } from "./ui/shooting-stars";
import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";
import Astronaut from "./ui/Astronaut";
import PlayButton from "./ui/PlayButton";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [shouldUnmount, setShouldUnmount] = useState(false);

  useEffect(() => {
    if (isExiting) {
      // Wait for internal exit sequence (Button -> Astro 2s -> Moon 1s)
      // Total approx 3s. Buffer to 3.5s for smoothness before zooming out.
      const exitTimer = setTimeout(() => {
        setShouldUnmount(true);
      }, 1500);
      return () => clearTimeout(exitTimer);
    }
  }, [isExiting]);

  // Entrance Timings (cumulative):
  // 1. Text starts: ~0.5s (staggered)
  // 2. Text ends: ~2.5s
  // 3. Moon Delay: 3.0s (Text end + 0.5s)
  // 4. Moon Duration: 1s -> Ends at 4.0s
  // 5. Astronaut Delay: 4.5s (Moon end + 0.5s)
  // 6. Astro Duration: 2s (Slower flight) -> Ends at 6.5s
  // 7. Button Delay: 7.0s (Astro end + 0.5s)

  const moonDelay = 0;
  const astronautDelay = 2;
  const buttonDelay = 2;

  const slideLeftVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2 + 0.5,
        duration: 0.9,
        ease: "easeOut",
      },
    }),
    exit: {
      x: -100,
      opacity: 0,
      transition: { duration: 0.5, delay: 0 }, // Text exits after moon starts going up
    },
  };

  const slideUpVariant = {
    hidden: { y: 60, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2 + 1.5,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
    exit: {
      y: 60,
      opacity: 0,
      transition: { duration: 0.5, delay: 0 }, // Text exits after moon starts going up
    },
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!shouldUnmount && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#030014]"
        >
          {/* Background DotMatrix */}
          <div className="absolute inset-0 z-0">
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-[#030014]"
              colors={[
                [255, 255, 255],
                [255, 255, 255],
              ]}
              dotSize={2}
            />
            <ShootingStars />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-10 right-0 z-20 transform -translate-x-1/2 md:top-10 md:right-10 lg:right-20"
          >
            <div className="scale-[0.8] md:scale-[0.9] lg:scale-100">
              <Astronaut
                moonDelay={moonDelay}
                astronautDelay={astronautDelay}
                isExiting={isExiting}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 flex flex-col items-center justify-center gap-8"
          >
            <motion.div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4deeea]/15 blur-3xl" />
            <motion.div className="absolute left-1/4 top-1/3 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-3xl mix-blend-screen" />
            <motion.div className="absolute left-2/3 top-2/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl mix-blend-screen" />

            {/* Text Content */}
            <div className="flex flex-col z-10 items-center justify-center gap-2 mt-20">
              {/* Line 1: Welcome To My */}
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-3xl md:text-5xl font-bold text-white tracking-tight">
                {["Welcome", "To", "My"].map((word, i) => (
                  <motion.span
                    key={word}
                    custom={i}
                    variants={slideLeftVariant}
                    initial="hidden"
                    animate={isExiting ? "exit" : "visible"}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* Line 2: Portfolio Website */}
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-3xl md:text-5xl font-bold">
                {["Space"].map((word, i) => (
                  <motion.span
                    key={word}
                    custom={i}
                    variants={slideUpVariant}
                    initial="hidden"
                    animate={isExiting ? "exit" : "visible"}
                    className="bg-clip-text text-gradient"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Play Button Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: isExiting ? 0 : 1,
                y: isExiting ? 30 : 0,
              }}
              transition={{
                delay: isExiting ? 0 : buttonDelay, // Exit immediately
                duration: 1,
              }}
              className="flex flex-col items-center justify-center gap-4 mt-12"
            >
              <p className="text-white/80 text-sm text-center font-light tracking-wide">
                Thank you for visiting my portfolio website!
              </p>
              <p className="text-white/80 text-sm text-center font-light tracking-wide">
                Are you ready to see me?
              </p>
              <div className="relative z-40">
                <PlayButton onClick={() => setIsExiting(true)} />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
