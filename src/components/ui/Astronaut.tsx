import React from "react";
import styled from "styled-components";
import astronaut from "../../assets/astronaut.png";
const Astronaut = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="moon -top-[18%] -right-[5%] md:-top-[10%] md:-right-[10%] lg:-top-[3%] lg:-right-[10%]" />
        <img src={astronaut} alt="astronaut" className="image -top-24" />

        {/* Shooting Stars */}
        <div className="star star-1" />
        <div className="star star-2" />
        <div className="star star-3" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    position: relative;
    width: 30em;
    height: 30em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* Removed card background and border */
    overflow: visible; /* Changed from hidden to visible so details aren't clipped if they move out */
    z-index: 1;
  }

  .image {
    position: relative; /* Ensure it sits above/below correctly */
    z-index: 5;
    animation: move 10s ease-in-out infinite;
  }

  /* Moon effect */
  .moon {
    position: absolute;
    width: 6em;
    height: 6em;
    border-radius: 50%;
    background: #f9f9fb;
    box-shadow: 0px 0px 100px rgba(193, 119, 241, 0.8),
      0px 0px 100px rgba(135, 42, 211, 0.8), inset #9b40fc 0px 0px 40px -12px;
    z-index: 2; /* Behind astronaut (z-index 5) but visible */
    transition: 0.4s ease-in-out;
  }

  /* Shooting Stars */
  .star {
    position: absolute;
    rotate: -45deg;
    width: 5em;
    height: 1px;
    background: linear-gradient(90deg, #ffffff, transparent);
    animation: 4s shootingStar infinite;
    z-index: 1;
  }

  .star-1 {
    top: -15%;
    left: 100%;
    animation-delay: 2s;
  }

  .star-2 {
    top: -20%;
    left: 130%;
    animation-delay: 5s;
    width: 7em;
  }

  .star-3 {
    top: -50%;
    left: 150%;
    animation-delay: 8s;
    width: 4em;
  }

  /* Make the moon glow more intensely on hover if desired, or just static. 
     The original had .card:hover .heading::after. 
     Let's keep it static or maybe subtle pulse if requested, but for now static to match "direct on splash". */

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

  @keyframes shootingStar {
    0% {
      transform: translateX(0) translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateX(-55em) translateY(0);
      opacity: 1;
    }
    70% {
      transform: translateX(-70em) translateY(0);
      opacity: 0;
    }
    100% {
      transform: translateX(0) translateY(0);
      opacity: 0;
    }
  }
`;

export default Astronaut;
