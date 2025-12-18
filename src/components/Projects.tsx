import { useRef, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, ArrowDown, ArrowUp } from "lucide-react";

const styles = `
@keyframes ruler {
  from { width: 0%; }
  to { width: 100%; }
}

.ruler-button {
  position: relative;
  overflow: hidden;
  border: none !important;
  outline: none !important;
}

.ruler-button:focus,
.ruler-button:active {
  border: none !important;
  outline: none !important;
}

.ruler-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, #22d3ee, #a855f7);
  transition: width 0.3s ease-out;
}

.ruler-button:hover::after {
  width: 100%;
}
`;

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
    title: "Next-Gen",
    description:
      "Management System for a company using Next.js, Tailwind CSS, Node.js, Supabase, and Cursor. Please use the password: Pa$$w0rd to login.",
    tags: ["React.js", "Tailwind CSS", "Shadcn UI", "Supabase", "Cursor"],
    imageUrl:
      "https://www.peanutsquare.com/wp-content/uploads/2023/04/React.js-CRUD-application-jpg.webp",
    link: "https://next-gen-e4.vercel.app/",
  },
  {
    id: 2,
    title: "DevTracker PRO",
    description:
      "DevTracker PRO is a modern tracking tool that allows you to track your daily task with modern AI features.",
    tags: ["React.js", "Tailwind CSS", "Shadcn UI", "Supabase", "Cursor"],
    imageUrl:
      "https://images.pexels.com/photos/6963017/pexels-photo-6963017.jpeg?cs=srgb&dl=pexels-mikhail-nilov-6963017.jpg&fm=jpg",
    link: "https://sokchan-calculator.vercel.app/",
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    description: "Static E-commerce solution with HTML, CSS and JAVASCRIPT.",
    tags: ["HTML", "CSS", "JavaScript", "AOS"],
    imageUrl: "https://sokchan-info-v3.vercel.app/assets/ecom-Bd2l15qF.png",
    link: "https://yansokchan.github.io/semicolon/home.html",
  },
  {
    id: 4,
    title: "Rock Paper Scissor",
    description: "Rock Paper Scissor game using HTML, CSS and JAVASCRIPT.",
    tags: ["HTML", "CSS", "Javascript"],
    imageUrl:
      "https://remptongames.com/wp-content/uploads/2024/08/rock-paper-scissors-1.png?w=1200",
    link: "https://yansokchan.github.io/RPS/rock-paper-scissors.html",
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
      data-aos={index % 2 === 0 ? "fade-up-right" : "fade-up-left"}
      data-aos-duration="600"
      className="relative bg-gradient-to-br from-cosmic-cyan/20 to-cosmic-purple/20 rounded-2xl shadow-lg overflow-hidden group duration-300 hover:scale-[1.03] hover:shadow-[0_0_0_4px_rgba(34,211,238,0.25),0_0_24px_8px_rgba(168,85,247,0.18)] max-w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <div className="p-3 md:p-4 pb-0">
        <div className="w-full aspect-video bg-[#23243a] rounded-2xl overflow-hidden flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-[1.02]">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="object-cover w-full h-full rounded-2xl bg-[#23243a] transition-transform duration-300 group-hover:scale-105"
            style={{ objectPosition: "center" }}
          />
        </div>
      </div>
      <div className="p-3 md:p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold text-cosmic-cyan mb-1 text-left">
          {project.title}
        </h3>
        <p className="text-sm text-gray-300 mb-2 text-left line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-cosmic-cyan/20 to-cosmic-purple/20 text-cosmic-cyan"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto gap-2">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-cosmic-cyan font-medium hover:underline text-sm px-3 py-2 rounded-md transition-colors"
          >
            Live Demo{" "}
            <ExternalLink className="w-4 h-4 group-hover:translate-x-[2px] group-hover:rotate-[15deg] transition-transform duration-300" />
          </a>

          <Link
            to={`/projects/${project.id}`}
            className="flex items-center gap-1 bg-gradient-to-r from-cosmic-cyan/20 to-cosmic-purple/20 hover:bg-cosmic-cyan/10 text-cosmic-cyan font-medium px-4 py-2 rounded-lg transition-colors text-sm shadow border border-[#23243a]/60"
          >
            Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const initialProjectsToShow = 4;

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
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span
              data-aos="fade-right"
              data-aos-delay="100"
              className="text-gradient"
            >
              Featured{" "}
            </span>
            <span data-aos="fade-left" className="text-white">
              Projects
            </span>
          </h2>
          <p data-aos="fade-up" className="text-gray-300 max-w-2xl mx-auto">
            Explore some of my latest work showcasing creative solutions and
            cutting-edge technologies.
          </p>
        </div>

        {/* Grid Layout for all screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* See More/Less Button
        <div className="flex justify-center mt-10">
          <style>{styles}</style>
          <button
            onClick={() => setShowAll(!showAll)}
            className="group ruler-button px-6 py-3 rounded-lg border-none outline-none focus:outline-none focus:border-none active:outline-none active:border-none bg-gradient-to-r from-cosmic-cyan/20 to-cosmic-purple/20 text-cosmic-cyan font-medium hover:shadow-[0_0_24px_8px_rgba(168,85,247,0.18)] transition-all duration-300 flex items-center gap-2"
          >
            {showAll ? (
              <>
                See Less
                <ArrowUp className="w-4 h-4 text-cosmic-cyan transition-transform duration-300 group-hover:-translate-y-1" />
              </>
            ) : (
              <>
                See More
                <ArrowDown className="w-4 h-4 text-cosmic-cyan transition-transform duration-300 group-hover:translate-y-1" />
              </>
            )}
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Projects;
