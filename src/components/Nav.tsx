import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AuroraText } from "./ui/aurora-text";

const Nav = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isManual, setIsManual] = useState(false);

  const navItems = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Don't update active state during manual navigation
      if (isManual) return;

      const homeSection = document.getElementById("home");
      const aboutSection = document.getElementById("about");
      const projectsSection = document.getElementById("projects");
      const contactSection = document.getElementById("contact");

      if (homeSection && aboutSection && projectsSection && contactSection) {
        const homeTop = homeSection.offsetTop;
        const aboutTop = aboutSection.offsetTop;
        const projectsTop = projectsSection.offsetTop;
        const contactTop = contactSection.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        if (scrollPosition >= contactTop) {
          setActiveTab("contact");
        } else if (scrollPosition >= projectsTop) {
          setActiveTab("projects");
        } else if (scrollPosition >= aboutTop) {
          setActiveTab("about");
        } else if (scrollPosition >= homeTop) {
          setActiveTab("home");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isManual]);

  const handleNavClick = (link: string) => {
    const section = link.replace("#", "");
    setActiveTab(section);
    setIsManual(true);

    // Reset manual mode after 1 second (enough time for smooth scroll)
    setTimeout(() => {
      setIsManual(false);
    }, 1000);
  };

  const pointsMarkup = (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {[...Array(10)].map((_, i) => (
        <i
          key={i}
          className={`absolute bottom-[-10px] w-[2px] h-[2px] bg-white rounded-full animate-floating-points opacity-0`}
          style={{
            left: `${[10, 30, 25, 44, 50, 75, 88, 58, 98, 65][i]}%`,
            animationDelay: `${
              [0.2, 0.5, 0.1, 0, 0, 1.5, 0.2, 0.2, 0.1, 0.2][i]
            }s`,
            animationDuration: `${
              [2.35, 2.5, 2.2, 2.05, 1.9, 1.5, 2.2, 2.25, 2.6, 2.5][i]
            }s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          }}
        />
      ))}
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <style>{`
        @keyframes floating-points {
          0% { transform: translateY(0); opacity: 1; }
          85% { opacity: 0; }
          100% { transform: translateY(-55px); opacity: 0; }
        }
        .animate-floating-points {
          animation-name: floating-points;
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <nav
          aria-label="Primary"
          className="mt-3 flex h-12 items-center justify-between rounded-full px-2"
        >
          {/* Left: availability pill */}
          <div data-aos="fade-right" className="hidden md:flex items-center">
            <a href="#" className="text-[22px] font-bold">
              {" "}
              <AuroraText>SOKCHAN</AuroraText>
              <span className="text-white text-glow"> YAN.</span>
            </a>
          </div>

          {/* Center: segmented links */}
          <div
            data-aos="fade-down"
            className="flex flex-1 items-center justify-center"
          >
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/5 p-1 text-sm text-white/80 relative">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  onClick={() => handleNavClick(item.link)}
                  className={`relative z-10 rounded-full px-3 py-1.5 transition-colors duration-200 ${
                    activeTab === item.link.replace("#", "")
                      ? "text-white"
                      : "hover:text-white"
                  }`}
                >
                  {activeTab === item.link.replace("#", "") && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full overflow-hidden"
                      style={{
                        background: `radial-gradient(65.28% 65.28% at 50% 100%, rgba(223, 113, 255, 0.8) 0%, rgba(223, 113, 255, 0) 100%), linear-gradient(0deg, #7a5af8, #7a5af8)`,
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    >
                      {pointsMarkup}
                    </motion.div>
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: CTA */}
          <div data-aos="fade-left" className="hidden md:flex items-center">
            <a
              onClick={() => handleNavClick("#contact")}
              href="#contact"
              className="inline-flex items-center gap-1 text-gradient text-xl font-medium"
            >
              <AuroraText>Get in Touch</AuroraText>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
