"use client";
import { useEffect, useRef, useState } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 1,
  textClassName = "",
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  textClassName?: string;
}) => {
  const [scope, animate] = useAnimate();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  let wordsArray = words.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "50px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
          transform: "translateY(0)",
        },
        {
          duration: duration,
          delay: stagger(0.1),
          ease: [0.2, 0.65, 0.3, 0.9],
        }
      );
    }
  }, [isVisible, scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <span key={word + idx} className="inline-block whitespace-normal">
              <motion.span
                className={cn(
                  "text-gray-300   opacity-0 inline-block mr-[6px]",
                  textClassName
                )}
                style={{
                  filter: filter ? "blur(8px)" : "none",
                  transform: "translateY(10px)",
                }}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div ref={containerRef} className={cn("", className)}>
      <div className="mt-4">
        <div className="text-gray-300 max-w-2xl mx-auto whitespace-pre-wrap break-words">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
