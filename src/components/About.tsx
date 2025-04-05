import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LampDemo } from "./ui/lamp";

interface Skill {
  name: string;
  level: number;
}

const skills: Skill[] = [
  { name: "Three.js / WebGL", level: 60 },
  { name: "React.js / Next.js", level: 70 },
  { name: "Javascript / TypeScript", level: 75 },
  { name: "Tailwind CSS / UI / UX Design", level: 75 },
  { name: "C / C++ / Java", level: 70 },
  { name: "Coding with AI / Tools", level: 78 },
];

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section id="about" className="section py-20" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">About </span>
            <span className="text-gradient">Me</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-cosmic-cyan">
              Creative Developer
            </h3>
            <p className="text-gray-300 mb-6">
              I'm a creative developer passionate about building immersive
              digital experiences that blend art and technology. With expertise
              in 3D graphics and interactive design, I create memorable web
              applications that push the boundaries of what's possible on the
              web.
            </p>
            <p className="text-gray-300 mb-6">
              My journey began with traditional web development, but I quickly
              fell in love with the creative possibilities offered by WebGL and
              Three.js. Today, I focus on crafting experiences that aren't just
              functional, but visually stunning and engaging.
            </p>
            <p className="text-gray-300">
              When I'm not coding, you can find me exploring new creative tools,
              experimenting with digital art, or stargazing with my telescope.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-4 text-cosmic-cyan">
              Skills & Expertise
            </h3>

            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-cosmic-cyan">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        isInView ? { width: `${skill.level}%` } : { width: 0 }
                      }
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                      className="bg-gradient-to-r from-cosmic-cyan to-cosmic-purple h-2.5 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
