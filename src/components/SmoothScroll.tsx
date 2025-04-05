import { ReactNode, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { useLocation } from "react-router-dom";

interface SmoothScrollProps {
  children: ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();
  const rafRef = useRef<number>();

  useEffect(() => {
    // Initialize Lenis with optimized settings
    lenisRef.current = new Lenis({
      duration: 0.8, // Reduced for better responsiveness
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // Optimized easing
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85, // Slightly reduced for smoother control
      touchMultiplier: 1.5, // Adjusted for better touch response
      syncTouch: true, // Better touch synchronization
    });

    // Optimized RAF loop
    const animate = () => {
      if (lenisRef.current) {
        lenisRef.current.raf(window.performance.now());
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenisRef.current?.destroy();
    };
  }, []);

  // Reset scroll position when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (
        anchor &&
        anchor.hash &&
        anchor.href.includes(window.location.pathname)
      ) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement && lenisRef.current) {
          lenisRef.current.scrollTo(targetElement as HTMLElement, {
            offset: -80,
            duration: 0.8, // Match the main scroll duration
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
