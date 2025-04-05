"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-6xl md:text-8xl font-bold tracking-tight relative"
      >
        <motion.span
          initial={{ backgroundPosition: "0 0" }}
          animate={{ backgroundPosition: "200% 0" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent bg-[size:200%] inline-block"
        >
          Creative{" "}
        </motion.span>
        <motion.span className="text-white inline-block">Developer</motion.span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl md:text-2xl text-cyan-200/80 mt-4 max-w-2xl mx-auto text-center font-light"
      >
        I build immersive digital experiences with cutting-edge web technologies
        and creative design solutions.
      </motion.p>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Left light beam */}
        <motion.div
          initial={{ opacity: 0.3, width: "15rem" }}
          whileInView={{ opacity: 0.7, width: "35rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-72 overflow-visible w-[35rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 h-48 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-48 h-[100%] left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right light beam */}
        <motion.div
          initial={{ opacity: 0.3, width: "15rem" }}
          whileInView={{ opacity: 0.7, width: "35rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-72 w-[35rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-48 h-[100%] right-0 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 h-48 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Light effects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 h-56 w-full translate-y-12 scale-x-150 blur-3xl bg-gradient-to-b from-cyan-400/30 to-transparent"
        />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-36 w-[32rem] -translate-y-1/2 rounded-full bg-cyan-400 opacity-30 blur-3xl"
        />

        {/* Lamp glow */}
        <motion.div
          initial={{ width: "8rem", opacity: 0.3 }}
          whileInView={{ width: "16rem", opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.6, 0.5] }}
          transition={{
            width: { delay: 0.3, duration: 0.8, ease: "easeInOut" },
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        />

        {/* Lamp line */}
        <motion.div
          initial={{ width: "15rem", opacity: 0.5 }}
          whileInView={{ width: "35rem", opacity: 0.8 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[35rem] -translate-y-[7rem] bg-cyan-400 drop-shadow-[0_0_2px_rgba(6,182,212,0.3)]"
        />

        {/* Soft radial gradient for overall ambiance */}
        <div className="absolute inset-0 z-40 bg-gradient-radial from-transparent via-transparent to-black/80 opacity-80" />
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
