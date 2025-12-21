import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactForm from "./contact/ContactForm";
import ContactInfo from "./contact/ContactInfo";
import CommentsSection from "./contact/CommentsSection";

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section
      id="contact"
      className="section !px-[25px] md:!px-8"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto">
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Contact<span className="text-gradient"> Me</span>
          </h2>
          <p className="text-gray-400">
            Got a question? Send me a message, and I'll get back to you soon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Get in Touch Form */}
          <div
            data-aos="fade-right"
            data-aos-delay="200"
            className="bg-gradient-to-r from-cyan-500/20 to-purple-400/20 p-4 md:p-8 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                data-aos="fade-right"
                data-aos-delay="300"
                className="text-[24px] text-cosmic-cyan font-semibold"
              >
                Get in Touch
              </h3>
              <button
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-cosmic-cyan"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </button>
            </div>

            <p
              data-aos="fade-right"
              data-aos-delay="300"
              className="text-gray-400 text-[18px] mb-6 md:mb-8"
            >
              Have something to discuss? Send me a message and let's talk.
            </p>

            <ContactForm onMouseMove={() => {}} setIsHovered={() => {}} />

            <ContactInfo />
          </div>

          {/* Right Side - Comments Section */}
          <CommentsSection />
        </div>
      </div>
    </section>
  );
};

export default Contact;
