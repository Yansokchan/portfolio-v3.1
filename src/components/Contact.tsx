
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };
  
  return (
    <section id="contact" className="section py-20" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Get in </span>
            <span className="text-white">Touch</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Feel free to reach out!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form 
              onSubmit={handleSubmit}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="glass p-8 rounded-xl relative overflow-hidden"
            >
              {/* Animated gradient background */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: isHovered 
                    ? `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(77, 238, 234, 0.3), transparent)`
                    : "none",
                  transition: "opacity 0.3s ease"
                }}
              />
              
              <div className="mb-6">
                <label htmlFor="name" className="block text-cosmic-cyan mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cosmic-cyan transition-colors"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-cosmic-cyan mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cosmic-cyan transition-colors"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-cosmic-cyan mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cosmic-cyan transition-colors resize-none"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="px-8 py-3 bg-cosmic-purple text-white rounded-lg hover:bg-cosmic-purple/90 transition-all duration-300 hover:shadow-lg hover:shadow-cosmic-purple/20"
              >
                Send Message
              </button>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="glass p-8 rounded-xl h-full">
              <h3 className="text-xl font-semibold text-cosmic-cyan mb-6">Contact Info</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-cosmic-purple/20 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cosmic-cyan">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Phone</h4>
                    <p className="text-white">+1 (123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-cosmic-purple/20 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cosmic-cyan">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Email</h4>
                    <p className="text-white">hello@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-cosmic-purple/20 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cosmic-cyan">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Location</h4>
                    <p className="text-white">San Francisco, CA</p>
                  </div>
                </div>
                
                <div className="pt-6 mt-6 border-t border-gray-800">
                  <h4 className="text-sm text-gray-400 mb-3">Find me on</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-cosmic-cyan transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-cosmic-cyan transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-cosmic-cyan transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5 0-.29-.01-.58-.04-.87A7.72 7.72 0 0 0 23 3z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
