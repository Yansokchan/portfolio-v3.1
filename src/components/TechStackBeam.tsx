"use client";

import React, { forwardRef, useRef } from "react";
import { AnimatedBeam } from "./magicui/animated-beam";
import { cn } from "@/lib/utils";

import profile2 from "../assets/awareness.png";


const Circle = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    children?: React.ReactNode;
  }
>(({ className, children }, ref) => {
  return (

    <div
      ref={ref}
      className={cn(
        "z-10 inline-flex items-center justify-center align-middle select-none font-sans text-center px-4 py-2 text-white text-sm font-medium rounded-full bg-white/2.5 border border-white/20 backdrop-blur-sm hover:bg-white/50 transition-all duration-300 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/30 before:via-transparent before:to-transparent before:opacity-30 before:pointer-events-none after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-tl after:from-white/50 after:via-transparent after:to-transparent after:opacity-30 after:pointer-events-none antialiased",
        className,
      )}
    >
      {children}
    </div>
  
  );
});


Circle.displayName = "Circle";

export function TechStackBeam({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const div8Ref = useRef<HTMLDivElement>(null);
  const div9Ref = useRef<HTMLDivElement>(null);
  const div10Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn("relative flex w-full items-center justify-center", className)}
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg max-h-[200px] flex-row items-stretch justify-between">
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref} >
            <p>React JS</p>
          </Circle>
          <Circle ref={div2Ref}>
            <p>Next JS</p>
          </Circle>
          <Circle ref={div3Ref}>
            <p>Tailwind</p>
          </Circle>
          
          <Circle ref={div4Ref}>
            <p>Git / Github</p>
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div5Ref} className="size-16">
            <img src={profile2} alt="Profile"                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
 />
          </Circle> 
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div6Ref}>
            <p>IT Solution</p>
          </Circle>
          <Circle ref={div7Ref}>
            <p>Security</p>
          </Circle>
          <Circle ref={div9Ref}>
            <p>Network</p>
          </Circle>
          <Circle ref={div10Ref}>
            <p>Consultant</p>
          </Circle>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div5Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div5Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div5Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div4Ref} toRef={div5Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div5Ref} toRef={div5Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={div5Ref} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={div7Ref} toRef={div5Ref} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={div8Ref} toRef={div5Ref} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={div9Ref} toRef={div5Ref} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={div10Ref} toRef={div5Ref} reverse />
      
    </div>
  );
}
