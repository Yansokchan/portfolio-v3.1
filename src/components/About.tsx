import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import pf1 from "../assets/pf1.jpg";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section id="about" className="section !px-[25px] md:!px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span
              data-aos="fade-right"
              data-aos-delay="100"
              className="text-gradient"
            >
              About{" "}
            </span>
            <span
              data-aos="fade-left"
              data-aos-delay="200"
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
          <div data-aos="fade-right" data-aos-delay="400" className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cosmic-cyan/20 to-cosmic-purple/20 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-cosmic-cyan/20 to-cosmic-purple/20 rounded-full" />
              <div className="absolute inset-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full overflow-hidden">
                <img
                  src={pf1}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-delay="500" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-cosmic-cyan">
                Who am I?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                I'm a passionate Full Stack Developer with a strong foundation
                in web development. My journey in technology began with a
                curiosity for how things work, which evolved into a deep love
                for creating innovative solutions.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-cosmic-cyan">
                My Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "JavaScript",

                  "React.js",
                  "Next.js",
                  "Node.js",
                  "Tailwind CSS",
                  "TypeScript",
                  "Git",
                  "GitHub",

                  "Supabase",
                ].map((skill, index) => (
                  <span
                    key={skill}
                    data-aos="fade-up"
                    data-aos-delay={600 + index * 50}
                    className="px-4 py-2 rounded-full bg-cosmic-purple/20 text-cosmic-cyan hover:bg-cosmic-purple/30 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-cosmic-cyan">
                What Drives Me
              </h3>
              <p className="text-gray-300 leading-relaxed">
                I'm constantly learning and adapting to new technologies. My
                goal is to create applications that not only look great but also
                provide meaningful solutions to real-world problems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
