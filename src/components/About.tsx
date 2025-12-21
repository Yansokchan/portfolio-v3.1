import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import pf1 from "../assets/pf1.png";
import { Timeline } from "./ui/timeline";
import ScrollVelocity from "./ui/ScrollVelocity";
import ShinyText from "./ShinyText";
import { TechStackBeam } from "./TechStackBeam";

import { Bug, BugOff } from "lucide-react";
import useScreenSize from "../hooks/use-screen-size";
import BoxCarousel, {
  type BoxCarouselRef,
  type CarouselItem,
} from "@/components/fancy/carousel/box-carousel";

import Meno from "../assets/Certificates/Meno.jpg";
import FortiNet1 from "../assets/Certificates/Fortinet Certified Fundamentals in Cybersecurity_page-0001.jpg";
import FortiNet2 from "../assets/Certificates/Fortinet Certified Associate in Cybersecurity (1)_page-0001.jpg";
import BBC1 from "../assets/Certificates/Black Belt AI - Ready Infrastructure Presales.png";
import BBC2 from "../assets/Certificates/Black Belt AI Fundamentals PreSales.png";
import BBC3 from "../assets/Certificates/Black Belt Cisco Future Proofed Workplaces Presales Stage 1 FY24.png";
import BBC4 from "../assets/Certificates/Black Belt Cisco Future Proofed Workplaces Presales Stage 2 FY24.png";
import BBC5 from "../assets/Certificates/Black Belt Cisco Spaces Presales Stage 1.png";
import BBC6 from "../assets/Certificates/Black Belt Cisco Spaces Presales Stage 2.png";
import BBC7 from "../assets/Certificates/Black Belt Cisco Spaces Presales Stage 3.png";
import BBC8 from "../assets/Certificates/Black Belt Secure Network Management Presales.png";
import CCNA from "../assets/Certificates/CCNA-_Introduction_to_Networks_certificate_sokchannotpro05-gmail-com_9b662dd6-68a3-4fc0-9176-bfaf70859377_page-0001.jpg";
import IoT from "../assets/Certificates/Introduction_to_IoT_certificate_sokchannotpro05-gmail-com_dabed586-77e7-44e9-b987-7ce928620a06_page-0001.jpg";
import CertiButton from "./ui/CertiButton";
interface StatCardProps {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

const carouselItems: CarouselItem[] = [
  {
    id: "1",
    type: "image",
    src: CCNA,
    alt: "CCNA",
  },
  {
    id: "2",
    type: "image",
    src: IoT,
    alt: "IoT",
  },
  {
    id: "3",
    type: "image",
    src: FortiNet1,
    alt: "FortiNet1",
  },

  {
    id: "4",
    type: "image",
    src: FortiNet2,
    alt: "FortiNet2",
  },

  {
    id: "5",
    type: "image",
    src: Meno,
    alt: "Meno",
  },
  {
    id: "6",
    type: "image",
    src: BBC1,
    alt: "BBC1",
  },
  {
    id: "7",
    type: "image",
    src: BBC1,
    alt: "BBC1",
  },
  {
    id: "8",
    type: "image",
    src: BBC2,
    alt: "BBC2",
  },
  {
    id: "9",
    type: "image",
    src: BBC3,
    alt: "BBC3",
  },
  {
    id: "10",
    type: "image",
    src: BBC4,
    alt: "BBC4",
  },
  {
    id: "11",
    type: "image",
    src: BBC5,
    alt: "BBC5",
  },
  {
    id: "12",
    type: "image",
    src: BBC6,
    alt: "BBC6",
  },
  {
    id: "13",
    type: "image",
    src: BBC7,
    alt: "BBC7",
  },
  {
    id: "14",
    type: "image",
    src: BBC8,
    alt: "BBC8",
  },
];

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

  const timelineData = [
    {
      title: "2024 - Present",
      content: (
        <div>
          <h4
            data-aos="fade-left"
            className="text-2xl font-bold text-cosmic-cyan mb-2"
          >
            Pre-Sales Network & Security Engineer
          </h4>

          <p data-aos="fade-left" className="text-gray-300 mb-4">
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
                data-aos="fade-up"
                data-aos-delay="200"
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
          <h4
            data-aos="fade-left"
            className="text-2xl font-bold text-cosmic-cyan mb-2"
          >
            Full Stack Passion
          </h4>
          <p data-aos="fade-left" className="text-gray-300 mb-4">
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
                data-aos="fade-up"
                data-aos-delay="200"
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
          <h4
            data-aos="fade-left"
            className="text-2xl font-bold text-cosmic-cyan mb-2"
          >
            Computer Science Student
          </h4>
          <p data-aos="fade-left" className="text-gray-300 mb-4">
            After completing secondary school, I moved to Phnom Penh to continue
            my university studies. I’m currently in my third year at the Royal
            University of Phnom Penh (RUPP) and am passionate about bridging the
            gap between complex security solutions and business needs.
          </p>
        </div>
      ),
    },
  ];

  const carouselRef = useRef<BoxCarouselRef>(null);
  const [debug, setDebug] = useState(false);
  const screenSize = useScreenSize();

  // Responsive dimensions based on screen size
  const getCarouselDimensions = () => {
    if (screenSize.lessThan("sm")) {
      return { width: 305, height: 210 };
    }
    if (screenSize.lessThan("md")) {
      return { width: 420, height: 305 };
    }
    return { width: 450, height: 320 };
  };

  const { width, height } = getCarouselDimensions();

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleIndexChange = (index: number) => {
    console.log("Index changed:", index);
  };

  const toggleDebug = () => {
    setDebug(!debug);
  };

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
              <div
                data-aos="fade-up"
                data-aos-duration="800"
                className="flex flex-col "
              >
                {/* <CSSBoxHoverDemo /> */}

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

              <div data-aos="fade-left">
                <TechStackBeam />
              </div>
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
          <div data-aos="fade-right">
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
        {/* Certifications Section */}
        <div className="mt-40 flex flex-col md:flex-row justify-center items-center md:items-start gap-20 text-muted-foreground">
          <div className="max-w-lg block md:hidden">
            <div data-aos="fade-left">
              {" "}
              <ShinyText
                data-aos="fade-left"
                text="Certifications & Development"
                disabled={false}
                speed={5}
                className="text-center text-3xl mb-4"
              />{" "}
            </div>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="mx-auto text-gray-300"
            >
              I have completed multiple professional certifications as part of
              my continuous learning journey in networking and security.
            </p>
            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="mx-auto text-gray-300 mt-4"
            >
              These achievements enhance my technical knowledge and presales
              skills, allowing me to deliver effective and business-aligned
              solutions.
            </p>
          </div>
          <div>
            <div data-aos="fade-right">
              {" "}
              <BoxCarousel
                ref={carouselRef}
                items={carouselItems}
                width={width}
                height={height}
                direction="right"
                onIndexChange={handleIndexChange}
                debug={debug}
                enableDrag
                perspective={1000}
                autoPlay
                autoPlayInterval={5000}
              />
            </div>
            <CertiButton onPrev={handlePrev} onNext={handleNext} />
          </div>
          <div className="max-w-lg hidden md:block">
            <div data-aos="fade-left">
              <ShinyText
                text="Certifications & Development"
                disabled={false}
                speed={5}
                className="text-center text-3xl mb-4"
              />{" "}
              <p data-aos="fade-left" className="mx-auto text-gray-300">
                I have completed multiple professional certifications as part of
                my continuous learning journey in networking and security.
              </p>
              <p
                data-aos="fade-left"
                data-aos-delay="300"
                className="mx-auto text-gray-300 mt-4"
              >
                These achievements enhance my technical knowledge and presales
                skills, allowing me to deliver effective and business-aligned
                solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
