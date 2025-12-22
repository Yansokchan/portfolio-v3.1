import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import astronaut from "../../assets/astronaut.webp";

interface AstronautProps {
  moonDelay?: number;
  astronautDelay?: number;
  isExiting?: boolean;
}

const Astronaut = ({
  moonDelay = 0,
  astronautDelay = 0.5,
  isExiting = false,
}: AstronautProps) => {
  return (
    <StyledWrapper>
      <div className="container">
        <motion.div
          initial={{ y: -200 }}
          animate={{
            y: isExiting ? -200 : 0,
            transition: {
              delay: moonDelay, // Exit after astronaut leaves (2s flight)
              duration: 2,
              ease: "easeInOut",
            },
          }}
          className="moon absolute -top-[18%] -right-[5%] md:-top-[10%] md:-right-[10%] lg:-top-[3%] lg:-right-[10%]"
        />

        {/* Wrapper for Entrance/Exit Flight */}
        <motion.div
          initial={{ x: 100, y: -100, scale: 0 }}
          animate={{
            x: isExiting ? 100 : 0,
            y: isExiting ? -100 : 0,
            scale: isExiting ? 0 : 1,
          }}
          transition={{
            delay: isExiting ? 0 : astronautDelay,
            duration: 6, // Slower, more natural flight
            ease: "circOut", // Decelerate smoothly
          }}
          className="relative top-16 z-[5]"
        >
          {/* Inner Image with CSS Infinite Float */}
          <img src={astronaut} alt="astronaut" className="image" />
        </motion.div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    position: relative;
    width: 16em;
    height: 16em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: visible;
    z-index: 1;
  }
  .image {
    position: relative; /* Ensure it sits above/below correctly */
    z-index: 5;
    animation: move 10s ease-in-out infinite;
  }

  /* Moon styling - positioning handled by motion/tailwind classes now, but keeping style properties */
  .moon {
    width: 6em;
    height: 6em;
    border-radius: 50%;
    background: #f9f9fb;
    box-shadow: 0px 0px 100px rgba(193, 119, 241, 0.8),
      0px 0px 100px rgba(135, 42, 211, 0.8), inset #9b40fc 0px 0px 40px -12px;
    z-index: 2;
  }

  @keyframes move {
    0% {
      transform: translateX(0em) translateY(0em);
    }
    25% {
      transform: translateY(-1em) translateX(-1em);
      rotate: -10deg;
    }
    50% {
      transform: translateY(1em) translateX(-1em);
    }
    75% {
      transform: translateY(-1.25em) translateX(1em);
      rotate: 10deg;
    }
    100% {
      transform: translateX(0em) translateY(0em);
    }
  }
`;

export default Astronaut;
