import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import pf1 from "../assets/pf1.png";
import { GlareCard } from "./ui/glare-card";
import { Code2, GraduationCap, Briefcase } from "lucide-react";
import { Timeline } from "./ui/timeline";

import ScrollVelocity from "./ui/ScrollVelocity";
import ShinyText from "./ShinyText";
import { TechStackBeam } from "./TechStackBeam";

interface StatCardProps {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

const StatCard = (props: StatCardProps) => {
  return (
    <div className="w-full">
      <GlareCard className="365:px-5 420:pt-4 510:p-9 sm:p-3 sm:pt-[10px] md:pt-5 md:px-6 p-4 lg:pt-3">
        <div className="h-full flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="200"
              className="xl:w-16 xl:h-16 sm:w-12 sm:h-12 420:w-16 420:h-16 320:w-12 320:h-12 w-10 h-10 rounded-full p-3 bg-gradient-to-r from-cosmic-cyan/30 to-cosmic-purple/30 flex items-center justify-center"
            >
              <props.icon className="420:w-10 420:h-10 320:w-8 320:h-8 w-6 h-6 text-cosmic-cyan" />
            </div>
            <span
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="200"
              className="420:text-5xl sm:text-4xl 320:text-3xl font-bold text-gradient"
            >
              {props.number}
            </span>
          </div>

          <div className="sm:mb-2 md:mb-1 sm:mt-2">
            <p
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
              className="510:text-2xl 420:text-xl 320:text-[16px] sm:text-[18px] lg:text-[16px] text-xs text-cosmic-cyan uppercase tracking-wider mb-2 sm:-mb-2 lg:mb-0"
            >
              {props.title}
            </p>
            <div className="flex items-center justify-between">
              <p
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
                className="510:text-xl 420:text-[16px] 320:text-[14px] sm:text-[14px] lg:text-[14px] text-xs text-gray-500"
              >
                {props.subtitle}
              </p>
            </div>
          </div>
        </div>
      </GlareCard>
    </div>
  );
};

const About = () => {
  const monthsSinceStartOf2024 = (() => {
    const start = new Date("2023-10-01T00:00:00");
    const now = new Date();
    let months =
      (now.getFullYear() - start.getFullYear()) * 12 +
      (now.getMonth() - start.getMonth());
    if (months < 0) months = 0;
    return months.toString();
  })();
  const [items] = useState([
    {
      id: "card-1",
      number: "8",
      title: "TOTAL PROJECTS",
      subtitle: "Innovative web solutions crafted",
      icon: Code2,
    },
    {
      id: "card-2",
      number: `${monthsSinceStartOf2024} + `,
      title: "MONTHS EXPERIENCE",
      subtitle: "Frontend & Backend Development",
      icon: Briefcase,
    },
    {
      id: "card-3",
      number: "1",
      title: "CERTIFICATES",
      subtitle: "Completed the Secondary School",
      icon: GraduationCap,
    },
  ]);

  const timelineData = [
    {
      title: "2024 - Present",
      content: (
        <div>
          <h4 className="text-2xl font-bold text-cosmic-cyan mb-2">
            Pre-Sales Network & Security Engineer
          </h4>
          <p className="text-gray-300 mb-4">
            Specializing in designing and presenting enterprise security
            solutions from leading vendors like Palo Alto Networks, Cisco, and
            Fortinet. Handling end-to-end network and security solutions
            including hardware, software, and cloud infrastructure.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Network Security",
              "Consultant",
              "Cisco",
              "Palo Alto",
              "Fortinet",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-cosmic-purple/20 text-cosmic-cyan text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Web Development",
      content: (
        <div>
          <h4 className="text-2xl font-bold text-cosmic-cyan mb-2">
            Full Stack Passion
          </h4>
          <p className="text-gray-300 mb-4">
            Before I moved into network security, I enjoy building modern
            applications using React, Next.js, and various database
            technologies. Creating applications that not only look great but
            also provide secure and meaningful solutions.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "React.js",
              "Next.js",
              "TypeScript",
              "Node.js",
              "Tailwind CSS",
              "Supabase",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-cosmic-purple/20 text-cosmic-cyan text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "2023 - Present",
      content: (
        <div>
          <h4 className="text-2xl font-bold text-cosmic-cyan mb-2">
            Computer Science Student
          </h4>
          <p className="text-gray-300 mb-4">
            After completing secondary school, I moved to Phnom Penh to continue
            my university studies. I’m currently in my third year at the Royal
            University of Phnom Penh (RUPP) and am passionate about bridging the
            gap between complex security solutions and business needs.
          </p>
        </div>
      ),
    },
  ];

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
      <div className="max-w-7xl mx-auto relative z-[1]">
        <div className="text-center mb-16">
          <h2
            data-aos="zoom-in"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span data-aos="fade-right" className="text-gradient">
              About{" "}
            </span>
            <span data-aos="fade-left" className="text-white">
              Me
            </span>
          </h2>
          <p data-aos="fade-up" className="text-gray-300 max-w-2xl mx-auto">
            Get to know more about my background, skills, and what drives me in
            the world of technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative w-full aspect-square max-w-[320px] sm:max-w-[360px] mx-auto">
              <div
                data-aos="fade-right"
                className="absolute inset-0 bg-gradient-to-r from-cosmic-cyan/20 to-cosmic-purple/20 rounded-full blur-3xl"
              />
              <div
                data-aos="fade-right"
                className="absolute inset-0 bg-gradient-to-r from-cosmic-cyan/20 to-cosmic-purple/20 rounded-full"
              />
              <div
                data-aos="fade-left"
                className="absolute inset-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={pf1}
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="mt-8">
              <div data-aos="fade-up" data-aos-duration="800">
                <ScrollVelocity
                  texts={["One Bro Many Dreams", "One Bro Many Dreams"]}
                  velocity={50}
                  className="text-cosmic-cyan"
                  velocityMapping={{ input: [0, 1000], output: [0, 5] }}
                  scrollerClassName="text-lg md:text-xl font-medium w-[250px] uppercase"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3
                data-aos="fade-left"
                className="text-2xl font-semibold text-cosmic-cyan"
              >
                Who am I?
              </h3>
              <p
                data-aos="fade-left"
                data-aos-delay="200"
                className="text-gray-300"
              >
                I’m a Pre-Sales Network & Security Engineer and a third-year
                Computer Science student at RUPP, with over a year of experience
                designing and presenting enterprise security solutions.
              </p>
              <p
                data-aos="fade-left"
                data-aos-delay="300"
                className="text-gray-300 mt-4"
              >
                Beyond network security, I'm passionate about web development
                and enjoy building modern applications.
              </p>
            </div>

            <div className="space-y-7">
              <h3
                data-aos="fade-left"
                className="text-2xl font-semibold text-cosmic-cyan"
              >
                My Skills
              </h3>

              <TechStackBeam />
            </div>

            <div className="space-y-4">
              <h3
                data-aos="fade-left"
                className="text-2xl font-semibold text-cosmic-cyan"
              >
                What Drives Me
              </h3>
              <p
                data-aos="fade-left"
                data-aos-delay="200"
                className="text-gray-300"
              >
                I’m constantly learning and adapting to new technologies,
                particularly in network and security technology. My goal is to
                create applications and solutions that not only look great but
                also deliver secure, reliable, and meaningful solutions to
                real-world problems.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative w-full mt-40 overflow-clip">
          <div>
            <ShinyText
              text="Changelog from my journey"
              disabled={false}
              speed={5}
              className="text-center text-3xl mb-4"
            />{" "}
            <p className="mx-auto text-gray-300">
              I’ve been working in Pre-Sales for over one year. Below is a
              timeline of my journey.
            </p>
          </div>

          <Timeline data={timelineData} />
        </div>
      </div>
    </section>
  );
};

export default About;
