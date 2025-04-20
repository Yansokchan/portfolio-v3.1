import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import pf1 from "../assets/pf1.jpg";
import { GlareCard } from "./ui/glare-card";
import { Code2, GraduationCap, Briefcase } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  Modifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useMediaQuery } from "react-responsive";
import styles from "./About.module.css";

interface StatCardProps {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  isMobile: boolean;
  isLastItem: boolean;
}

const SortableStatCard = (props: StatCardProps) => {
  const [isDragStart, setIsDragStart] = useState(false);
  const [counter, setCounter] = useState(1500);
  const counterRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isDragStart && counter > 0) {
      counterRef.current = setInterval(() => {
        setCounter((prev) => Math.max(0, prev - 10));
      }, 10);
    } else {
      if (counterRef.current) {
        clearInterval(counterRef.current);
      }
      if (!isDragStart) {
        setCounter(1500);
      }
    }

    return () => {
      if (counterRef.current) {
        clearInterval(counterRef.current);
      }
    };
  }, [isDragStart]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
    touchAction: "none",
    position: "relative" as const,
  };

  const progressStyle = {
    strokeDashoffset: ((2000 - counter) / 2000) * 100,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`w-full select-none ${
        props.isMobile ? "sm:transform-none" : ""
      }`}
      onTouchStart={() => setIsDragStart(true)}
      onTouchEnd={() => setIsDragStart(false)}
      onTouchCancel={() => setIsDragStart(false)}
    >
      <GlareCard className="365:px-5 420:pt-4 510:p-9 sm:p-3 sm:pt-[10px] md:pt-5 md:px-6 p-4 lg:pt-3">
        {props.isMobile && isDragStart && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              {counter > 0 ? (
                <>
                  <div className="w-12 h-12 relative flex items-center justify-center">
                    <svg className="w-full h-full absolute" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className="stroke-cosmic-cyan/20"
                        strokeWidth="2"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className={`stroke-cosmic-cyan ${styles.progressCircle}`}
                        strokeWidth="2"
                        style={{
                          strokeDashoffset: ((1500 - counter) / 1500) * 100,
                        }}
                      />
                    </svg>
                    <span className="text-cosmic-cyan text-sm font-medium z-10">
                      {(counter / 1000).toFixed(1)}s
                    </span>
                  </div>
                </>
              ) : (
                <div className="px-4 py-2 bg-cosmic-cyan/10 rounded-lg">
                  <span className="text-cosmic-cyan text-sm font-medium">
                    You can move
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="h-full flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="200"
              className="xl:w-16 xl:h-16 sm:w-12 sm:h-12 420:w-16 420:h-16 320:w-12 320:h-12 w-10 h-10 rounded-full p-3 bg-gradient-to-r from-cosmic-cyan/30 to-cosmic-purple/30 flex items-center justify-center"
            >
              <props.icon className="420:w-10 420:h-10 320:w-8 320:h-8 w-6 h-6 text-cosmic-cyan" />
            </div>
            <span
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="200"
              className="420:text-5xl sm:text-4xl 320:text-3xl font-bold text-gradient"
            >
              {props.number}
            </span>
          </div>

          <div className="sm:mb-2 md:mb-1 sm:mt-2">
            <p
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
              className="510:text-2xl 420:text-xl 320:text-[16px] sm:text-[18px] lg:text-[16px] text-xs text-cosmic-cyan uppercase tracking-wider mb-2 sm:-mb-2 lg:mb-0"
            >
              {props.title}
            </p>
            <div className="flex items-center justify-between">
              <p
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
                className="510:text-xl 420:text-[16px] 320:text-[14px] sm:text-[14px] lg:text-[14px] text-xs text-gray-500"
              >
                {props.subtitle}
              </p>
            </div>
          </div>
        </div>
      </GlareCard>
    </div>
  );
};

const About = () => {
  const [showFullImage, setShowFullImage] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [items, setItems] = useState([
    {
      id: "card-1",
      number: "8",
      title: "TOTAL PROJECTS",
      subtitle: "Innovative web solutions crafted",
      icon: Code2,
    },
    {
      id: "card-2",
      number: "16+",
      title: "MONTHS EXPERIENCE",
      subtitle: "Frontend & Backend Development",
      icon: Briefcase,
    },
    {
      id: "card-3",
      number: "1",
      title: "CERTIFICATES",
      subtitle: "Completed the Secondary School",
      icon: GraduationCap,
    },
  ]);

  const isMobile = useMediaQuery({ maxWidth: 640 });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: isMobile
        ? {
            delay: 2000, // 2 seconds delay for mobile
            tolerance: 5, // Allow small movements during the delay
          }
        : {
            distance: 8, // Distance threshold for desktop
          },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        // Prevent moving the last item to the right
        if (oldIndex === items.length - 1 && newIndex > oldIndex) {
          return items;
        }

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Custom modifier that prevents the last item from moving right
  const restrictLastItemMovement: Modifier = ({ transform, active }) => {
    if (!active || !active.id) {
      return transform;
    }

    const activeIndex = items.findIndex((item) => item.id === active.id);
    const isLastItem = activeIndex === items.length - 1;

    if (isLastItem && transform.x > 0) {
      return {
        ...transform,
        x: 0,
      };
    }

    return transform;
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 100,
    });
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    if (showFullImage) {
      // Get current scroll position
      const scrollY = window.scrollY;

      // Prevent scroll but maintain position
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
      document.body.style.position = "relative";

      // Add event listeners
      document.addEventListener("wheel", preventDefault, { passive: false });
      document.addEventListener("touchmove", preventDefault, {
        passive: false,
      });

      // Store scroll position
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      // Restore scroll
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.position = "";

      // Remove event listeners
      document.removeEventListener("wheel", preventDefault);
      document.removeEventListener("touchmove", preventDefault);

      // Restore scroll position if it was stored
      const scrollY = document.body.dataset.scrollY;
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
      }
    }

    return () => {
      // Cleanup
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.position = "";
      document.removeEventListener("wheel", preventDefault);
      document.removeEventListener("touchmove", preventDefault);
    };
  }, [showFullImage]);

  const handleImageClick = () => {
    setIsAnimating(true);
    setShowFullImage(true);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(false);
    setShowFullImage(false);
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
                onClick={handleImageClick}
              >
                <img
                  src={pf1}
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-cosmic-cyan text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                    Click to expand
                  </span>
                </div>
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
              <p data-aos="fade-left" className="text-gray-300 leading-relaxed">
                I'm a passionate Full Stack Developer with a strong foundation
                in web development. My journey in technology began with a
                curiosity for how things work, which evolved into a deep love
                for creating innovative solutions.
              </p>
            </div>

            <div className="space-y-4">
              <h3
                data-aos="fade-left"
                className="text-2xl font-semibold text-cosmic-cyan"
              >
                My Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "JavaScript",
                  "React.js",
                  "Next.js",
                  "Node.js",
                  "Three.js",
                  "Tailwind CSS",
                  "TypeScript",
                  "Git",
                  "GitHub",
                  "Supabase",
                ].map((skill, index) => (
                  <span
                    key={skill}
                    data-aos="fade-up"
                    data-aos-delay={400 + index * 50}
                    className="px-4 py-2 rounded-full bg-cosmic-purple/20 text-cosmic-cyan hover:bg-cosmic-purple/30 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3
                data-aos="fade-left"
                className="text-2xl font-semibold text-cosmic-cyan"
              >
                What Drives Me
              </h3>
              <p data-aos="fade-left" className="text-gray-300 leading-relaxed">
                I'm constantly learning and adapting to new technologies. My
                goal is to create applications that not only look great but also
                provide meaningful solutions to real-world problems.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="mt-16">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={
              isMobile ? [restrictToVerticalAxis] : [restrictLastItemMovement]
            }
          >
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={
                isMobile
                  ? verticalListSortingStrategy
                  : horizontalListSortingStrategy
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    data-aos-duration="800"
                  >
                    <SortableStatCard
                      {...item}
                      isMobile={isMobile}
                      isLastItem={index === items.length - 1}
                    />
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {showFullImage && (
        <div
          className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => {
            setIsAnimating(false);
            setShowFullImage(false);
          }}
        >
          <div
            className="relative max-w-3xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={pf1}
              alt="Profile"
              className={`max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl p-[3px] bg-gradient-to-r from-cosmic-cyan/80 to-cosmic-purple/80 ${
                isAnimating ? "modal-enter" : "modal-exit"
              }`}
            />
            {/* Mobile-only close button */}
            <div className="block md:hidden absolute top-20 -right-1 z-[1001]">
              <button
                data-aos="fade-left"
                data-aos-duration="300"
                className="text-white/80 hover:text-white transition-colors bg-gradient-to-r from-cosmic-cyan/70 to-cosmic-purple/70 rounded-full p-2"
                onClick={handleCloseClick}
              >
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
