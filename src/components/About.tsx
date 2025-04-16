import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import pf1 from "../assets/pf1.jpg";

const About = () => {
  const [showFullImage, setShowFullImage] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 100,
    });
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    if (showFullImage) {
      // Get current scroll position
      const scrollY = window.scrollY;

      // Prevent scroll but maintain position
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
      document.body.style.position = "relative";

      // Add event listeners
      document.addEventListener("wheel", preventDefault, { passive: false });
      document.addEventListener("touchmove", preventDefault, {
        passive: false,
      });

      // Store scroll position
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      // Restore scroll
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.position = "";

      // Remove event listeners
      document.removeEventListener("wheel", preventDefault);
      document.removeEventListener("touchmove", preventDefault);

      // Restore scroll position if it was stored
      const scrollY = document.body.dataset.scrollY;
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
      }
    }

    return () => {
      // Cleanup
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.position = "";
      document.removeEventListener("wheel", preventDefault);
      document.removeEventListener("touchmove", preventDefault);
    };
  }, [showFullImage]);

  const handleImageClick = () => {
    setIsAnimating(true);
    setShowFullImage(true);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(false);
    setShowFullImage(false);
  };

  return (
    <section id="about" className="section !px-[25px] md:!px-8">
      <div className="max-w-7xl mx-auto relative z-[1]">
        <div className="text-center mb-16">
          <h2
            data-aos="zoom-in"
            data-aos-delay="300"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span
              data-aos="fade-right"
              data-aos-delay="300"
              className="text-gradient"
            >
              About{" "}
            </span>
            <span
              data-aos="fade-left"
              data-aos-delay="300"
              className="text-white"
            >
              Me
            </span>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Get to know more about my background, skills, and what drives me in
            the world of technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-left" data-aos-delay="300" className="relative">
            <div className="relative w-full aspect-square max-w-[320px] sm:max-w-[360px] mx-auto">
              {/* Base image with effects */}
              <div
                data-aos="fade-right"
                data-aos-delay="400"
                className="absolute inset-0 bg-gradient-to-r from-cosmic-cyan/20 to-cosmic-purple/20 rounded-full blur-3xl"
              />
              <div
                data-aos="fade-right"
                data-aos-delay="300"
                className="absolute inset-0 bg-gradient-to-r from-cosmic-cyan/20 to-cosmic-purple/20 rounded-full"
              />
              <div
                className="absolute inset-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={handleImageClick}
              >
                <img
                  src={pf1}
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                    Click to expand
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3
                data-aos="fade-left"
                data-aos-delay="300"
                className="text-2xl font-semibold text-cosmic-cyan"
              >
                Who am I?
              </h3>
              <p
                data-aos="fade-left"
                data-aos-delay="500"
                className="text-gray-300 leading-relaxed"
              >
                I'm a passionate Full Stack Developer with a strong foundation
                in web development. My journey in technology began with a
                curiosity for how things work, which evolved into a deep love
                for creating innovative solutions.
              </p>
            </div>

            <div className="space-y-4">
              <h3
                data-aos="fade-left"
                data-aos-delay="300"
                className="text-2xl font-semibold text-cosmic-cyan"
              >
                My Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "JavaScript",
                  "React.js",
                  "Next.js",
                  "Node.js",
                  "Three.js",
                  "Tailwind CSS",
                  "TypeScript",
                  "Git",
                  "GitHub",

                  "Supabase",
                ].map((skill, index) => (
                  <span
                    key={skill}
                    data-aos="fade-up"
                    data-aos-delay={400 + index * 50}
                    className="px-4 py-2 rounded-full bg-cosmic-purple/20 text-cosmic-cyan hover:bg-cosmic-purple/30 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3
                data-aos="fade-left"
                data-aos-delay="300"
                className="text-2xl font-semibold text-cosmic-cyan"
              >
                What Drives Me
              </h3>
              <p
                data-aos="fade-left"
                data-aos-delay="500"
                className="text-gray-300 leading-relaxed"
              >
                I'm constantly learning and adapting to new technologies. My
                goal is to create applications that not only look great but also
                provide meaningful solutions to real-world problems.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {showFullImage && (
        <div
          className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => {
            setIsAnimating(false);
            setShowFullImage(false);
          }}
        >
          <div
            className="relative max-w-3xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={pf1}
              alt="Profile"
              className={`max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl p-[3px] bg-gradient-to-r from-cosmic-cyan/80 to-cosmic-purple/80 ${
                isAnimating ? "modal-enter" : "modal-exit"
              }`}
            />
            {/* Mobile-only close button */}
            <div className="block md:hidden absolute top-20 -right-1 z-[1001]">
              <button
                data-aos="fade-left"
                data-aos-duration="300"
                className="text-white/80 hover:text-white transition-colors bg-gradient-to-r from-cosmic-cyan/70 to-cosmic-purple/70 rounded-full p-2"
                onClick={handleCloseClick}
              >
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
