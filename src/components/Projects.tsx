import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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
      "Management System for a company using Next.js, Tailwind CSS, Supabase, and Cursor. Please use the password: Pa$$w0rd to login.",
    tags: ["Next.js", "Tailwind CSS", "Supabase", "Cursor"],
    imageUrl:
      "https://khtkcvecjfjzmoormqjp.supabase.co/storage/v1/object/public/employee-profiles/e89f032a-c8f6-4dbc-9c28-ebaf7c6c556e/78556db8-f4cf-4034-89c1-81e4b3d6f2dc.png",
    link: "https://next-gen-e4.vercel.app/",
  },
  {
    id: 2,
    title: "Calculator",
    description: "Simple Calculator using HTML, CSS and JAVASCRIPT.",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl:
      "https://images.pexels.com/photos/6963017/pexels-photo-6963017.jpeg?cs=srgb&dl=pexels-mikhail-nilov-6963017.jpg&fm=jpg",
    link: "https://yansokchan.github.io/calculator/calculator.html",
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    description: "Static E-commerce solution with HTML, CSS and JAVASCRIPT.",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl:
      "https://portfolio-v3-seven-kappa.vercel.app/assets/ecom-Bd2l15qF.png",
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
  {
    id: 5,
    title: "Portfolio V1",
    description: "Portfolio V1 using React Vite and Tailwind CSS.",
    tags: ["Vite", "Tailwind"],
    imageUrl:
      "https://portfolio-v3-seven-kappa.vercel.app/assets/pfl1-BhNu1Ovl.png",
    link: "https://yansokchan.github.io/my-portfolio/",
  },
  {
    id: 6,
    title: "Portfolio V2",
    description: "Portfolio V2 using React Vite, Tailwind CSS, GSAP, Daisy UI.",
    tags: ["Vite", "Tailwind", "GSAP", "Daisy UI"],
    imageUrl:
      "https://portfolio-v3-seven-kappa.vercel.app/assets/pfl2-DxOFezEw.png",
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
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    once: true,
    amount: 0.2,
    margin: "-50px",
  });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                delay: index * 0.05,
                ease: "easeOut",
              },
            }
          : {
              opacity: 0,
              y: 50,
            }
      }
      className="relative bg-gradient-to-r from-cyan-500/20 to-purple-400/20 rounded-xl overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <motion.div
        className="h-72 w-full relative overflow-hidden"
        animate={{
          scale: isHovered ? 1.03 : 1,
          translateZ: isHovered ? "20px" : "0px",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          animate={{
            opacity: isHovered ? 0.9 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <motion.div
        className="p-6"
        animate={{
          translateZ: isHovered ? "30px" : "0px",
          y: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.h3
          className="text-xl font-semibold text-white mb-2"
          animate={{
            y: isHovered ? -5 : 0,
            color: isHovered ? "rgb(77, 238, 234)" : "rgb(255, 255, 255)",
          }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.h3>
        <motion.p
          className="text-gray-300 mb-4"
          animate={{
            opacity: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          {project.description}
        </motion.p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.3,
                        delay: index * 0.05 + tagIndex * 0.05,
                      },
                    }
                  : {
                      opacity: 0,
                      scale: 0.8,
                    }
              }
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(147, 51, 234, 0.3)",
              }}
              className="px-3 py-1 text-xs rounded-full bg-cosmic-purple/20 text-cosmic-cyan"
            >
              {tag}
            </motion.span>
          ))}
        </div>
        <motion.a
          target="_blank"
          href={project.link}
          className="inline-block px-6 py-2 rounded-sm bg-cosmic-purple/10 text-cosmic-cyan border border-cosmic-cyan/20 hover:border-cosmic-cyan transition-colors duration-300"
          whileHover={{
            scale: 1.02,
            backgroundColor: "rgba(147, 51, 234, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          View Project
        </motion.a>
      </motion.div>

      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 ring-2 ring-cosmic-cyan pointer-events-none"
        animate={{
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "-100px",
  });

  return (
    <section id="projects" className="section py-20" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-gradient"
            >
              Featured{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white"
            >
              Projects
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Explore some of my latest work showcasing creative solutions and
            cutting-edge technologies.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
