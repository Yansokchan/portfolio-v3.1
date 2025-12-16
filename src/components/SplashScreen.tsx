import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeXml, Github, Globe, User } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 3500); // Start exit animation at 3.5s

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isExiting) {
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 800); // Wait for exit animation to complete (0.8s)
      return () => clearTimeout(exitTimer);
    }
  }, [isExiting, onComplete]);

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
        transition: { duration: 0.5, ease: "easeIn" }
    }
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
        transition: { duration: 0.5, ease: "easeIn" }
    }
  };

  return (
    <AnimatePresence>
    {!isExiting ? (
    <motion.div
        key="splash"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ 
            opacity: 0, 
            scale: 1.1, 
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: "easeInOut" } 
        }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#030014]"
    >
      {/* Background Glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        <motion.div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4deeea]/15 blur-3xl" />
        <motion.div className="absolute left-1/4 top-1/3 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-3xl mix-blend-screen" />
        <motion.div className="absolute left-2/3 top-2/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl mix-blend-screen" />
        
        {/* Top Icons */}
        {/* <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.1)]">
            <CodeXml className="w-6 h-6 text-purple-400" />
            <div className="w-px h-5 bg-white/10" />
            <User className="w-6 h-6 text-purple-400" />
            <div className="w-px h-5 bg-white/10" />
            <Github className="w-6 h-6 text-purple-400" />
        </div> */}

        {/* Text Content */}
        <div className="flex flex-col items-center gap-2">
            {/* Line 1: Welcome To My */}
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-3xl md:text-5xl font-bold text-white tracking-tight">
                {["Welcome", "To", "My"].map((word, i) => (
                    <motion.span
                        key={word}
                        custom={i}
                        variants={slideLeftVariant}
                        initial="hidden"
                        animate="visible"
                    >
                        {word}
                    </motion.span>
                ))}
            </div>

            {/* Line 2: Portfolio Website */}
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-3xl md:text-5xl font-bold">
                {["Portfolio", "Website"].map((word, i) => (
                    <motion.span
                        key={word}
                        custom={i}
                        variants={slideUpVariant}
                        initial="hidden"
                        animate="visible"
                        className="bg-clip-text text-gradient"
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-12 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-purple-300/80 text-sm hover:bg-white/10 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="tracking-wide">sokchanyan.vercel.app</span>
      </motion.div>
    </motion.div>
    ) : null}
    </AnimatePresence>
  );
};

export default SplashScreen;
