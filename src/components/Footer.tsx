import { motion } from "framer-motion";
import Likes from "./ui/Likes";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a
              href="#"
              className="text-xl font-bold text-cosmic-cyan text-glow"
            >
              Portfolio<span className="text-cosmic-purple">.</span>
            </a>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <motion.a
              target="_blank"
              href="https://www.facebook.com/lichantong"
              whileHover={{ y: -3 }}
              className="text-gray-400 hover:text-cosmic-cyan transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </motion.a>

            <motion.a
              target="_blank"
              href="https://www.instagram.com/lichantong/#"
              whileHover={{ y: -3 }}
              className="text-gray-400 hover:text-cosmic-cyan transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </motion.a>

            <motion.a
              target="_blank"
              href="https://www.linkedin.com/in/sokchan-yan-74277b335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              whileHover={{ y: -3 }}
              className="text-gray-400 hover:text-cosmic-cyan transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </motion.a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between  gap-4 mt-5">
          <div className="text-gray-400 text-sm">
            © {year} All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <p className="text-gray-400 text-sm">
              A like tells me you’ve arrived
            </p>
            <Likes />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
