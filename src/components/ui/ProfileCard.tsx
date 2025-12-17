import React from "react";
import styled from "styled-components";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import pf1 from "../../assets/pf1.jpeg";
import CreditsButton from "../CreditsButton";

const ProfileCard = () => {
  return (
    <StyledWrapper>
      <div className="card scale-125">
        <div className="profile-pic hover:border-white/50 transition-all duration-300 border-2 border-white">
          <img src={pf1} alt="Profile" />
        </div>
        <div className="bottom inline-flex items-center align-middle select-none font-sans  text-center px-4 py-2 text-white text-sm font-medium rounded-lg bg-white/2.5 border border-white/50 backdrop-blur-[2px] transition-all duration-300 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-40 before:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-30 after:pointer-events-none antialiased">
          <div className="content text-start">
            <span className="name">Sokchan Yan</span>
            <span className="about-me">
              A third-year student in Computer Science at RUPP.
            </span>
          </div>
          <div className="bottom-bottom">
            <div className="social-links-container">
              <a href="#" aria-label="Github">
                <Github className="icon" />
              </a>
              <a href="#" aria-label="Linkedin">
                <Linkedin className="icon" />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram className="icon" />
              </a>
            </div>
            <a className="button scale-75" href="#contact">
              <CreditsButton text="Contact" />
            </a>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 280px;
    height: 280px;
    border-radius: 32px;
    position: relative;
    transition: all 0.5s ease-in-out;
  }

  .card .profile-pic {
    position: absolute;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    top: 3px;
    left: 3px;
    border-radius: 29px;
    z-index: 1;
    border: 0px solid #fbb9b6;
    overflow: hidden;
    transition: all 0.5s ease-in-out 0.2s, z-index 0.5s ease-in-out 0.2s;
  }

  .card .profile-pic img {
    -o-object-fit: cover;
    object-fit: cover;
    width: 100%;
    height: 100%;
    -o-object-position: 0px 0px;
    object-position: 0px 0px;
    transition: all 0.5s ease-in-out 0s;
  }

  .card .bottom {
    position: absolute;
    bottom: 3px;
    left: 3px;
    right: 3px;
    top: 75%;
    border-radius: 29px;
    z-index: 2;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  }

  .card .bottom .content {
    position: absolute;
    bottom: 0;
    left: 1.5rem;
    right: 1.5rem;
    height: 160px;
  }

  .card .bottom .content .name {
    display: block;
    font-size: 1.2rem;
    color: white;
    font-weight: bold;
  }

  .card .bottom .content .about-me {
    display: block;
    font-size: 0.9rem;
    color: white;
    margin-top: 1rem;
  }

  .card .bottom .bottom-bottom {
    position: absolute;
    bottom: 0.5rem;
    left: 2rem;
    right: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
  }

  .card .bottom .bottom-bottom .social-links-container {
    display: flex;
    gap: 1rem;
  }

  .card .bottom .bottom-bottom .social-links-container .icon {
    height: 20px;
    width: 20px;
    color: white;
    filter: drop-shadow(0 5px 5px rgba(165, 132, 130, 0.1333333333));
    transition: all 0.3s ease;
  }

  .card .bottom .bottom-bottom .social-links-container .icon:hover {
    color: #f55d56;
    transform: scale(1.2);
  }

  .card .bottom .bottom-bottom .button {
    transition: all 0.3s ease;
  }

  .card:hover {
    border-top-left-radius: 55px;
  }

  .card:hover .bottom {
    top: 20%;
    border-radius: 80px 29px 29px 29px;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
  }
  .card:hover .bottom .bottom-bottom {
    bottom: 1rem;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
  }

  .card:hover .profile-pic {
    width: 100px;
    height: 100px;
    aspect-ratio: 1;
    top: 10px;
    left: 10px;
    border-radius: 50%;
    z-index: 3;
    border: 5px solid #fbb9b6;
    box-shadow: rgba(96, 75, 74, 0.1882352941) 0px 5px 5px 0px;
    transition: all 0.5s ease-in-out, z-index 0.5s ease-in-out 0.1s;
  }

  .card:hover .profile-pic img {
    transform: scale(2.5);
    -o-object-position: 0px 25px;
    object-position: 0px 25px;
    transition: all 0.5s ease-in-out 0.5s;
  }
`;

export default ProfileCard;
