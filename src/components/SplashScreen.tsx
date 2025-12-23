import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeXml, Github, Globe, User } from "lucide-react";
import { ShootingStars } from "./ui/shooting-stars";
import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";
import Astronaut from "./ui/Astronaut";
import PlayButton from "./ui/PlayButton";
import { SplittingText } from "./ui/shadcn-io/splitting-text";

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
  const buttonDelay = 4.2;

  const slideLeftVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2 + 1,
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
  const slideRightVariant = {
    hidden: { x: 100, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2 + 1,
        duration: 0.9,
        ease: "easeOut",
      },
    }),
    exit: {
      x: 100,
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
  const slideDownVariant = {
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
            className="relative z-10 flex flex-col items-center justify-center"
          >
            <motion.div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4deeea]/15 blur-3xl" />
            <motion.div className="absolute left-1/4 top-1/3 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-3xl mix-blend-screen" />
            <motion.div className="absolute left-2/3 top-2/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl mix-blend-screen" />

            {/* Text Content */}
            <div className="flex flex-col z-10 items-center justify-center gap-2 mt-20">
              {/* Line 1: Welcome To My */}
              <div className="flex flex-col gap-2 justify-center text-center gap-y-1 text-3xl md:text-5xl font-bold text-white tracking-tight">
                <motion.span
                  variants={slideLeftVariant}
                  initial="hidden"
                  animate={isExiting ? "exit" : "visible"}
                >
                  <SplittingText
                    text="WELCOME TO MY"
                    type="chars"
                    delay={400}
                  />
                </motion.span>
                <motion.span
                  variants={slideRightVariant}
                  animate={isExiting ? "exit" : "visible"}
                >
                  <SplittingText text="SPACE" type="chars" delay={1500} />
                </motion.span>
              </div>
            </div>

            {/* Play Button Section */}
            <div className="flex flex-col items-center justify-center gap-2 mt-12">
              <motion.span
                variants={slideLeftVariant}
                initial="hidden"
                animate={isExiting ? "exit" : "visible"}
              >
                <SplittingText
                  className="text-sm text-white/80"
                  type="words"
                  inView
                  delay={2000}
                  text="Thank you for visiting my portfolio website!"
                  motionVariants={{
                    initial: {
                      y: 50,
                      scale: 0.5,
                      opacity: 0,
                      x: 50,
                      rotate: 90,
                    },
                    animate: { y: 0, scale: 1, opacity: 1, x: 0, rotate: 0 },
                    transition: { duration: 0.5, ease: "easeOut" },
                  }}
                />
              </motion.span>
              <motion.span
                variants={slideRightVariant}
                initial="hidden"
                animate={isExiting ? "exit" : "visible"}
              >
                <SplittingText
                  className="text-sm text-white/80"
                  type="chars"
                  inView
                  delay={3000}
                  text="Are you ready to see me?"
                  motionVariants={{
                    initial: {
                      y: 50,
                      scale: 0.5,
                      opacity: 0,
                      x: 50,
                      rotate: 90,
                    },
                    animate: { y: 0, scale: 1, opacity: 1, x: 0, rotate: 0 },
                    transition: { duration: 0.5, ease: "easeOut" },
                  }}
                />
              </motion.span>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: isExiting ? 0 : 1,
              }}
              transition={{
                delay: isExiting ? 0 : buttonDelay, // Exit immediately
                duration: 0.5,
              }}
              className="flex flex-col items-center justify-center gap-4 mt-5"
            >
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
