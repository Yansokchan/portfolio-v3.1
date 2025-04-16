import { useRef, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio V3",
    description:
      "The first 3D Portfolio V3 using React Vite, Tailwind CSS, Three.js. I love this project because it's a 3D portfolio that showcases my projects and skills.",
    tags: ["Vite", "Tailwind", "Three.js"],
    imageUrl:
      "https://khtkcvecjfjzmoormqjp.supabase.co/storage/v1/object/public/employee-profiles/c7b4390b-a329-4133-88b5-7be93fad53d7/bfef93b9-6c79-46f8-9bb5-9d9494bcae63.png",
    link: "https://sokchan-info-v3.vercel.app/",
  },
  {
    id: 2,
    title: "Next-Gen",
    description:
      "Management System for a company using Next.js, Tailwind CSS, Node.js, Supabase, and Cursor. Please use the password: Pa$$w0rd to login.",
    tags: ["Next.js", "Tailwind CSS", "Node.js", "Supabase", "Cursor"],
    imageUrl:
      "https://khtkcvecjfjzmoormqjp.supabase.co/storage/v1/object/public/employee-profiles/e89f032a-c8f6-4dbc-9c28-ebaf7c6c556e/78556db8-f4cf-4034-89c1-81e4b3d6f2dc.png",
    link: "https://next-gen-e4.vercel.app/",
  },
  {
    id: 3,
    title: "Calculator",
    description: "Simple Calculator using HTML, CSS and JAVASCRIPT.",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl:
      "https://images.pexels.com/photos/6963017/pexels-photo-6963017.jpeg?cs=srgb&dl=pexels-mikhail-nilov-6963017.jpg&fm=jpg",
    link: "https://sokchan-calculator.vercel.app/",
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    description: "Static E-commerce solution with HTML, CSS and JAVASCRIPT.",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl: "https://sokchan-info-v3.vercel.app/assets/ecom-Bd2l15qF.png",
    link: "https://yansokchan.github.io/semicolon/home.html",
  },
  {
    id: 5,
    title: "Rock Paper Scissor",
    description: "Rock Paper Scissor game using HTML, CSS and JAVASCRIPT.",
    tags: ["HTML", "CSS", "Javascript"],
    imageUrl:
      "https://remptongames.com/wp-content/uploads/2024/08/rock-paper-scissors-1.png?w=1200",
    link: "https://yansokchan.github.io/RPS/rock-paper-scissors.html",
  },
  {
    id: 6,
    title: "Portfolio V1",
    description: "Portfolio V1 using React Vite and Tailwind CSS.",
    tags: ["Vite", "Tailwind"],
    imageUrl: "https://sokchan-info-v3.vercel.app/assets/pfl1-BhNu1Ovl.png",
    link: "https://yansokchan.github.io/my-portfolio/",
  },
  {
    id: 7,
    title: "Portfolio V2",
    description: "Portfolio V2 using React Vite, Tailwind CSS, GSAP, Daisy UI.",
    tags: ["Vite", "Tailwind", "GSAP", "Daisy UI"],
    imageUrl: "https://sokchan-info-v3.vercel.app/assets/pfl2-DxOFezEw.png",
    link: "https://yansokchan.github.io/portfolio/",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-duration="800"
      className="relative bg-gradient-to-r from-cyan-500/20 to-purple-400/20 rounded-xl overflow-hidden group transition-transform duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <div className="h-72 w-full relative overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay={index * 100}
        className="p-6 transition-transform duration-300 group-hover:-translate-y-1"
      >
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cosmic-cyan transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-4 group-hover:opacity-100 transition-opacity duration-300">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tag}
              data-aos="fade-up"
              data-aos-delay={index * 100 + tagIndex * 50}
              data-aos-duration="600"
              className="px-3 py-1 text-xs rounded-full bg-cosmic-purple/20 text-cosmic-cyan hover:bg-cosmic-purple/30 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          data-aos="fade-up"
          data-aos-delay={index * 100 + 100}
          target="_blank"
          href={project.link}
          className="inline-block px-6 py-2 rounded-sm bg-cosmic-purple/10 text-cosmic-cyan border border-cosmic-cyan/20 hover:border-cosmic-cyan transition-all duration-300 hover:bg-cosmic-purple/20"
        >
          View Project
        </a>
      </div>

      <div className="absolute inset-0 rounded-xl opacity-0 ring-2 ring-cosmic-cyan pointer-events-none group-hover:opacity-30 transition-opacity duration-300" />
    </div>
  );
};

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const initialProjectsToShow = 6;

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 100,
    });
  }, []);

  const displayedProjects = showAll
    ? projects
    : projects.slice(0, initialProjectsToShow);

  return (
    <section id="projects" className="section !px-[25px] md:!px-8">
      <div className="max-w-7xl mx-auto py-20">
        <div className="text-center mb-16">
          <h2
            data-aos="zoom-in"
            data-aos-delay="300"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span
              data-aos="fade-right"
              data-aos-delay="100"
              className="text-gradient"
            >
              Featured{" "}
            </span>
            <span
              data-aos="fade-left"
              data-aos-delay="200"
              className="text-white"
            >
              Projects
            </span>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Explore some of my latest work showcasing creative solutions and
            cutting-edge technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {projects.length > initialProjectsToShow && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 rounded-sm bg-cosmic-purple/10 text-cosmic-cyan border border-cosmic-cyan/20 hover:border-cosmic-cyan transition-all duration-300 hover:bg-cosmic-purple/20"
            >
              {showAll ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
