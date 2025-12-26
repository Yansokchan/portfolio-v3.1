import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";
import Astronaut from "./ui/Astronaut";
import PlayButton from "./ui/PlayButton";
import AOS from "aos";
import "aos/dist/aos.css";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [shouldUnmount, setShouldUnmount] = useState(false);

  useEffect(() => {
    AOS.init({
      once: true,
      mirror: false,
    });
  }, []);

  useEffect(() => {
    if (isExiting) {
      const exitTimer = setTimeout(() => {
        setShouldUnmount(true);
      }, 1000);
      return () => clearTimeout(exitTimer);
    }
  }, [isExiting]);

  const moonDelay = 1.0;
  const astronautDelay = 3.5;
  const buttonDelay = 1.5;

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
              <motion.div
                className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-3xl md:text-5xl font-bold text-white tracking-tight"
                animate={isExiting ? { x: -100, opacity: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                {["Welcome", "To", "My"].map((word, i) => (
                  <span
                    key={i}
                    data-aos="fade-right"
                    data-aos-delay={i * 200 + 600} // Starts at 500ms, then 700ms, 900ms
                    data-aos-duration="1000"
                    className="inline-block"
                  >
                    {word}
                  </span>
                ))}
              </motion.div>

              {/* Line 2: Portfolio Website */}
              <motion.div
                className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-3xl md:text-5xl font-bold"
                animate={isExiting ? { x: 100, opacity: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                {["Portfolio", "Website"].map((word, i) => (
                  <span
                    key={i}
                    data-aos="zoom-in-up"
                    data-aos-delay={i * 200 + 1200} // Starts at 1200ms, then 1400ms
                    data-aos-duration="1000"
                    className="bg-clip-text text-gradient inline-block"
                  >
                    {word}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Play Button Section */}
            <motion.div
              className="flex flex-col items-center justify-center gap-4 mt-12"
              animate={isExiting ? { y: 50, opacity: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <p
                data-aos="fade-up"
                data-aos-delay="2000"
                data-aos-duration="1000"
                className="text-white/80 text-sm text-center font-light tracking-wide"
              >
                Thank you for visiting my portfolio website!
              </p>
              <p
                data-aos="fade-up"
                data-aos-delay="2200"
                data-aos-duration="1000"
                className="text-white/80 text-sm text-center font-light tracking-wide"
              >
                Are you ready to see me?
              </p>
              <div
                data-aos="fade-up"
                data-aos-delay="2400"
                data-aos-duration="1000"
                className="relative z-40"
              >
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
