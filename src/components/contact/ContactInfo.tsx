import { FaArrowRightFromBracket } from "react-icons/fa6";

const ContactInfo = () => {
  return (
    <div data-aos="fade-up" data-aos-delay="300">
      <div className="md:p-8 p-4 mt-5 bg-gradient-to-r from-cyan-500/15 to-purple-400/15 rounded-xl h-full">
        <h3
          data-aos="fade-right"
          data-aos-delay="300"
          className="text-xl font-semibold text-cosmic-cyan mb-6"
        >
          Contact Info
        </h3>

        <div className="space-y-5 md:space-y-6">
          {/* Phone */}
          <div className="flex items-start">
            <div
              data-aos="fade-right"
              data-aos-delay="300"
              className="bg-gradient-to-r from-cyan-500/20 to-purple-400/20 p-3 rounded-lg mr-4"
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
                className="text-cosmic-cyan"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <h4
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-sm text-gray-400 mb-1"
              >
                Phone
              </h4>
              <p
                data-aos="fade-left"
                data-aos-delay="600"
                className="text-white"
              >
                +855| 97-5948-051
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start">
            <div
              data-aos="fade-right"
              data-aos-delay="300"
              className="bg-gradient-to-r from-cyan-500/20 to-purple-400/20 p-3 rounded-lg mr-4"
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
                className="text-cosmic-cyan"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="flex-1">
              <h4
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-sm text-gray-400 mb-1"
              >
                Email
              </h4>
              <div className="flex items-center gap-2">
                <p
                  data-aos="fade-left"
                  data-aos-delay="600"
                  className="text-white text-sm md:text-base break-all"
                >
                  yansokchan05@gmail.com
                </p>
                <a
                  data-aos="fade-left"
                  data-aos-delay="1000"
                  href="mailto:yansokchan05@gmail.com?subject=Portfolio Inquiry&body=Hello, I came across your portfolio and would like to discuss a project."
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-cosmic-purple/20 hover:bg-cosmic-purple/30 transition-colors flex items-center gap-1"
                >
                  <FaArrowRightFromBracket className="text-cosmic-cyan hover:-rotate-45 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start">
            <div
              data-aos="fade-right"
              data-aos-delay="300"
              className="bg-gradient-to-r from-cyan-500/20 to-purple-400/20 p-3 rounded-lg mr-4"
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
                className="text-cosmic-cyan"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <h4
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-sm text-gray-400 mb-1"
              >
                Location
              </h4>
              <p
                data-aos="fade-left"
                data-aos-delay="600"
                className="text-white"
              >
                Chbar Ompov, Phnom Penh
              </p>
            </div>
          </div>

          {/* Divider and Social Links */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="relative w-full"
          >
            <div className="absolute left-0 right-0 top-0 h-px w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cosmic-cyan to-transparent h-[2px] w-full blur-sm opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cosmic-cyan to-transparent h-px w-full" />
            </div>
            <div className="absolute left-1/4 right-1/4 top-0 h-px w-1/2">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cosmic-purple to-transparent h-[3px] w-full blur-sm opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cosmic-purple to-transparent h-px w-full" />
            </div>
          </div>
          <div className="pt-6 mt-6">
            <h4
              data-aos="fade-right"
              data-aos-delay="300"
              className="text-sm text-gray-400 mb-3"
            >
              Find me on
            </h4>
            <div className="flex space-x-3 md:space-x-4">
              <a
                data-aos="fade-up"
                data-aos-delay="300"
                href="https://www.linkedin.com/in/sokchan-yan-74277b335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-cosmic-cyan transition-colors"
              >
                {/* LinkedIn SVG */}
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
              </a>
              <a
                data-aos="fade-up"
                href="https://github.com/Yansokchan"
                data-aos-delay="400"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-cosmic-cyan transition-colors"
              >
                {/* GitHub SVG */}
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
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a
                data-aos="fade-up"
                data-aos-delay="500"
                href="https://t.me/Sokchan_YAN"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-cosmic-cyan transition-colors"
              >
                {/* Telegram SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 2L11 13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
