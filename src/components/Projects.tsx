
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Cosmic Dashboard",
    description: "A stunning admin dashboard with 3D data visualizations and interactive charts.",
    tags: ["React", "Three.js", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    title: "Galaxy Explorer",
    description: "Interactive WebGL-based space visualization with realistic physics simulation.",
    tags: ["WebGL", "JavaScript", "Physics"],
    imageUrl: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    title: "Nebula UI Kit",
    description: "A comprehensive UI library for building space-themed web applications.",
    tags: ["UI/UX", "Design System", "React"],
    imageUrl: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative glass rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      <div 
        className="h-72 w-full relative overflow-hidden"
        style={{
          transform: isHovered ? "translateZ(20px) scale(1.03)" : "translateZ(0) scale(1)",
          transition: "transform 0.3s ease-out"
        }}
      >
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      
      <div 
        className="p-6"
        style={{
          transform: isHovered ? "translateZ(30px)" : "translateZ(0)",
          transition: "transform 0.3s ease-out"
        }}
      >
        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1 text-xs rounded-full bg-cosmic-purple/20 text-cosmic-cyan"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  return (
    <section id="projects" className="section py-20" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Featured </span>
            <span className="text-white">Projects</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore some of my latest work showcasing creative solutions and cutting-edge technologies.
          </p>
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
