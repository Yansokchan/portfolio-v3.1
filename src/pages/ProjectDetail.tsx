import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github as GithubIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Spotlight } from "../components/ui/spotlight-new";

// You may want to move this to a shared location
const projects = [
  {
    id: 1,
    title: "Portfolio V3",
    description:
      "I'm really interested in Three.js, so I created this 3D portfolio. I love this project because it looks beautiful and runs smoothly.",
    tags: ["Vite", "Tailwind", "Three.js", "AOS"],
    imageUrl:
      "https://khtkcvecjfjzmoormqjp.supabase.co/storage/v1/object/public/employee-profiles/c7b4390b-a329-4133-88b5-7be93fad53d7/bfef93b9-6c79-46f8-9bb5-9d9494bcae63.png",
    link: "https://sokchan-info-v3.vercel.app/",
    github: "https://github.com/yansokchan/portfolio-v3",
    public: true,
  },
  {
    id: 2,
    title: "Next-Gen",
    description:
      "This is a first full stack project, that I made. It's a management system when I learn Next.js. It can manage employees, customers, products, and orders. It also has a dashboard to track the revenue per day, week and month. Please use the password: Pa$$w0rd to login.",
    tags: ["Next.js", "Tailwind CSS", "Node.js", "Supabase", "Cursor"],
    imageUrl:
      "https://khtkcvecjfjzmoormqjp.supabase.co/storage/v1/object/public/employee-profiles/e89f032a-c8f6-4dbc-9c28-ebaf7c6c556e/78556db8-f4cf-4034-89c1-81e4b3d6f2dc.png",
    link: "https://next-gen-e4.vercel.app/",
    github: "https://github.com/yansokchan/next-gen",
    public: false,
  },
  {
    id: 3,
    title: "Calculator",
    description:
      "This is a simple calculator using HTML, CSS and JavaScript. I really appreciate this project because it's a simple project but I can use in my daily life.",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl:
      "https://images.pexels.com/photos/6963017/pexels-photo-6963017.jpeg?cs=srgb&dl=pexels-mikhail-nilov-6963017.jpg&fm=jpg",
    link: "https://sokchan-calculator.vercel.app/",
    github: "https://github.com/yansokchan/calculator",
    public: true,
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    description: "Static E-commerce solution with HTML, CSS and JAVASCRIPT.",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl: "https://sokchan-info-v3.vercel.app/assets/ecom-Bd2l15qF.png",
    link: "https://yansokchan.github.io/semicolon/home.html",
    github: "https://github.com/yansokchan/semicolon",
    public: true,
  },
  {
    id: 5,
    title: "Rock Paper Scissor",
    description: "Rock Paper Scissor game using HTML, CSS and JAVASCRIPT.",
    tags: ["HTML", "CSS", "Javascript"],
    imageUrl:
      "https://remptongames.com/wp-content/uploads/2024/08/rock-paper-scissors-1.png?w=1200",
    link: "https://yansokchan.github.io/RPS/rock-paper-scissors.html",
    github: "https://github.com/yansokchan/RPS",
    public: true,
  },
  {
    id: 6,
    title: "Portfolio V1",
    description: "Portfolio V1 using React Vite and Tailwind CSS.",
    tags: ["Vite", "Tailwind"],
    imageUrl: "https://sokchan-info-v3.vercel.app/assets/pfl1-BhNu1Ovl.png",
    link: "https://yansokchan.github.io/my-portfolio/",
    github: "https://github.com/yansokchan/my-portfolio",
    public: true,
  },
  {
    id: 7,
    title: "Portfolio V2",
    description: "Portfolio V2 using React Vite, Tailwind CSS, GSAP, Daisy UI.",
    tags: ["Vite", "Tailwind", "GSAP", "Daisy UI"],
    imageUrl: "https://sokchan-info-v3.vercel.app/assets/pfl2-DxOFezEw.png",
    link: "https://yansokchan.github.io/portfolio/",
    github: "https://github.com/yansokchan/portfolio",
    public: true,
  },
];

const features = [
  "Password protection, No action in 3 minutes login again",
  "Manage Employees,Customers,Products ,and Orders",
  "CRUD operation",
  "Tracking revenue per day, week and month",
];

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === Number(id));
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <p>Project not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-cosmic-cyan text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c0c0c] via-[#1b152c] to-[#000103] px-4 md:px-0 py-12 flex flex-col items-center relative overflow-hidden">
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-gradient-to-br from-cyan-950 via-gray-900 to-purple-950 p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-md text-center relative animate-fall-from-top">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center justify-center gap-2">
              <span className="text-yellow-400">&#9888;</span> Project Not
              Public
            </h2>
            <p className="text-white mb-4 sm:mb-6 text-sm sm:text-base">
              Sorry, this project cannot provide source code.
            </p>
            <button
              onClick={() => setShowAlert(false)}
              className="button-55 relative overflow-hidden px-8 py-1 rounded-xl font-semibold text-lg shadow-lg transition-transform flex items-center gap-2 bg-[#18122B] text-white group"
            >
              <span className="absolute inset-0 animated-bg bg-gradient-to-br from-cyan-800 to-purple-800 z-0"></span>

              <span className="relative z-10 flex items-center gap-2">
                Close
              </span>
            </button>
            <button
              onClick={() => setShowAlert(false)}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white text-lg sm:text-xl hover:text-yellow-400 transition"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(280, 100%, 85%, .10) 0, hsla(260, 100%, 55%, .04) 50%, hsla(260, 100%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(280, 100%, 85%, .08) 0, hsla(260, 100%, 55%, .03) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(280, 100%, 85%, .05) 0, hsla(260, 100%, 45%, .02) 80%, transparent 100%)"
        translateY={-350}
        width={560}
        height={1380}
        smallWidth={240}
        duration={7}
        xOffset={100}
      />
      <div className="w-full max-w-5xl mx-auto relative z-10">
        {/* Back and Breadcrumbs */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[#18122B] text-white hover:bg-cosmic-cyan/10 border border-[#23243a]/60"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-gray-400">Projects</span>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-white font-semibold">{project.title}</span>
        </div>
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          {project.title}
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-cosmic-cyan to-cosmic-purple rounded-full mb-8" />
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* Left: Description, Stats, Buttons, Tech */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#18122B] rounded-2xl p-6 shadow-lg">
              <p className="text-lg text-gray-200 mb-0">
                {project.description}
              </p>
            </div>
            {/* Stats */}

            {/* Buttons */}
            <div className="flex gap-4 mt-2">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="button-55 relative overflow-hidden px-8 py-3 rounded-xl font-semibold text-lg shadow-lg transition-transform flex items-center gap-2 bg-[#18122B] text-white group"
              >
                {/* Animated background */}
                <span className="absolute inset-0 animated-bg bg-gradient-to-r from-cyan-950 to-purple-950 z-0"></span>
                {/* Content */}

                <span className="relative z-10 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 group-hover:rotate-[15deg] group-hover:text-cosmic-cyan transition-transform" />
                  Live Demo
                </span>
              </a>
              <a
                href={project.public && project.github}
                onClick={() => {
                  if (!project.public) {
                    setShowAlert(true);
                  }
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="button-55 relative overflow-hidden px-8 py-3 rounded-xl font-semibold text-lg shadow-lg transition-transform flex items-center gap-2 bg-[#18122B] text-white group"
              >
                {/* Animated background */}
                <span className="absolute inset-0 animated-bg bg-gradient-to-r from-purple-950 to-cyan-950 z-0"></span>
                {/* Content */}

                <span className="relative z-10 flex items-center gap-2">
                  <GithubIcon className="w-5 h-5 group-hover:rotate-[15deg] group-hover:text-cosmic-purple transition-transform" />
                  Github
                </span>
              </a>
            </div>
            {/* Technologies Used */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-cosmic-cyan text-xl">&lt;/&gt;</span>
                <span className="text-white font-semibold text-lg">
                  Technologies Used
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-4 py-1 rounded-full bg-gradient-to-r from-[#23243a]/20 to-cosmic-purple/20 text-cosmic-cyan border border-cosmic-cyan/30 text-sm font-medium mt-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Right: Image and Key Features */}
          <div className="flex flex-col items-center justify-start gap-6">
            <div className="flex items-center justify-center w-full">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="rounded-2xl shadow-lg max-w-xs md:max-w-md w-full object-cover "
              />
            </div>
            {/* Key Features */}
            {project.id === 2 && (
              <div className="bg-gradient-to-br from-cosmic-cyan/10 to-cosmic-purple/10 border border-[#23243a] rounded-2xl p-8 shadow-lg w-full">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-yellow-400">★</span> Key Features
                </h2>
                <ul className="list-disc pl-6 text-gray-200 space-y-2">
                  {features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
