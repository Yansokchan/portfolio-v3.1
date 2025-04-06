import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [prevSection, setPrevSection] = useState("home");

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Update active section based on scroll position
    const sections = menuItems.map((item) => item.href.replace("#", ""));
    const currentSection = sections.find((section) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    if (currentSection) {
      setPrevSection(activeSection);
      setActiveSection(currentSection);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (section: string) => {
    setPrevSection(activeSection);
    setActiveSection(section);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8,
        }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-black/20 backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to="/"
                className="text-2xl font-bold text-cosmic-cyan text-glow"
              >
                SOKCHAN<span className="text-cosmic-purple">.</span>YAN
              </Link>
            </motion.div>

            {/* Desktop menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {menuItems.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                      activeSection === item.href.replace("#", "")
                        ? "text-cosmic-cyan"
                        : "text-gray-300 hover:text-cosmic-cyan"
                    }`}
                    onClick={() =>
                      handleSectionClick(item.href.replace("#", ""))
                    }
                  >
                    {item.name}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan"
                      initial={{ width: "0%" }}
                      animate={{
                        width:
                          activeSection === item.href.replace("#", "")
                            ? "100%"
                            : "0%",
                        transition: { duration: 0.3 },
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <motion.div
              className="md:hidden relative z-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-cosmic-cyan focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-40"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{
                duration: 0.2,
                ease: [0.23, 1, 0.32, 1], // Custom cubic bezier for smooth easing
              }}
              className="flex flex-col items-center justify-center min-h-screen px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full max-w-xs space-y-4">
                {menuItems.map((item, index) => (
                  <a
                    data-aos="fade-right"
                    data-aos-duration="400"
                    data-aos-delay={200 + index * 100}
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setIsOpen(false);
                      handleSectionClick(item.href.replace("#", ""));
                    }}
                    className={`block w-full px-6 py-4 text-lg font-medium rounded-xl transition-all duration-300 ${
                      activeSection === item.href.replace("#", "")
                        ? "text-cosmic-cyan bg-gradient-to-r from-cosmic-purple/20 to-cosmic-cyan/20 border border-cosmic-cyan/20"
                        : "text-gray-300 hover:text-cosmic-cyan hover:bg-gray-800/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      {activeSection === item.href.replace("#", "") && (
                        <motion.div
                          className="w-2 h-2 rounded-full bg-cosmic-cyan"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.2,
                            ease: "backOut",
                          }}
                        />
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
