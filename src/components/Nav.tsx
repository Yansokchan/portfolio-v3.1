import { Check, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const Nav = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <nav
          aria-label="Primary"
          className="mt-3 flex h-12 items-center justify-between rounded-full px-2"
        >
          {/* Left: availability pill */}
          <div className="flex items-center">
            <a
              href="#"
              className="text-[22px] font-bold text-cosmic-cyan text-glow"
            >
              SOKCHAN YAN<span className="text-cosmic-purple">.</span>
            </a>
          </div>

          {/* Center: segmented links */}
          <div className="flex -ml-[46px] flex-1 items-center md:justify-center justify-end">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/5 p-1 text-sm text-white/80">
              <a
                href="#about"
                className="rounded-full px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors"
              >
                About
              </a>
              <div className="mx-1 h-4 w-px bg-white/10" aria-hidden />
              <a
                href="#projects"
                className="rounded-full px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors"
              >
                Projects
              </a>
            </div>
          </div>

          {/* Right: CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-1 text-gradient text-xl"
            >
              Get in Touch
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
