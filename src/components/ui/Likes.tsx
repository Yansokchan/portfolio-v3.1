import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { supabase } from "@/lib/supabaseClient";

const LIKE_STORAGE_KEY = "portfolio_has_liked";

const Likes = () => {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check localStorage and fetch initial count on mount
  useEffect(() => {
    const checkLikedStatus = () => {
      const liked = localStorage.getItem(LIKE_STORAGE_KEY);
      if (liked === "true") {
        setHasLiked(true);
      }
    };

    const fetchLikeCount = async () => {
      try {
        const { data, error } = await supabase
          .from("likes")
          .select("count")
          .eq("id", 1)
          .single();

        if (error) {
          console.error("Error fetching likes:", error);
          return;
        }

        if (data) {
          setLikeCount(data.count);
        }
      } catch (err) {
        console.error("Error fetching likes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkLikedStatus();
    fetchLikeCount();
  }, []);

  const handleLike = async () => {
    // Prevent multiple likes
    if (hasLiked || isLoading) return;

    try {
      // Optimistic update
      setLikeCount((prev) => prev + 1);
      setHasLiked(true);
      localStorage.setItem(LIKE_STORAGE_KEY, "true");

      // Update in Supabase
      const { error } = await supabase.rpc("increment_likes");

      if (error) {
        // If using RPC fails, try direct update
        const { error: updateError } = await supabase
          .from("likes")
          .update({
            count: likeCount + 1,
            updated_at: new Date().toISOString(),
          })
          .eq("id", 1);

        if (updateError) {
          console.error("Error updating likes:", updateError);
          // Rollback on error
          setLikeCount((prev) => prev - 1);
          setHasLiked(false);
          localStorage.removeItem(LIKE_STORAGE_KEY);
        }
      }
    } catch (err) {
      console.error("Error liking:", err);
      // Rollback on error
      setLikeCount((prev) => prev - 1);
      setHasLiked(false);
      localStorage.removeItem(LIKE_STORAGE_KEY);
    }
  };

  return (
    <StyledWrapper>
      <div
        className={`like-button ${hasLiked ? "liked" : ""}`}
        onClick={handleLike}
      >
        {/* Floating points animation */}
        <div className="points_wrapper">
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
        </div>

        <input
          className="on"
          id="heart"
          type="checkbox"
          checked={hasLiked}
          readOnly
          disabled={hasLiked}
        />
        <label className={`like ${hasLiked ? "liked" : ""}`} htmlFor="heart">
          <svg
            className="like-icon"
            fillRule="nonzero"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
          <span className="like-text">{hasLiked ? "Liked" : "Like"}</span>
        </label>
        {/* Count container with slide animation */}
        <div className="like-count-wrapper">
          <span className={`like-count one ${hasLiked ? "slid" : ""}`}>
            {isLoading ? "..." : likeCount - (hasLiked ? 1 : 0)}
          </span>
          <span className={`like-count two ${hasLiked ? "slid" : ""}`}>
            {isLoading ? "..." : likeCount - (hasLiked ? 1 : 0) + 1}
          </span>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  #heart {
    display: none;
  }

  .like-button {
    --round: 0.75rem;
    position: relative;
    cursor: pointer;
    display: flex;
    height: 42px;
    width: 126px;
    border-radius: var(--round);
    border: none;
    overflow: hidden;
    transition: all 0.25s ease;
    background: radial-gradient(
        65.28% 65.28% at 50% 100%,
        rgba(223, 113, 255, 0.8) 0%,
        rgba(223, 113, 255, 0) 100%
      ),
      linear-gradient(0deg, #7a5af8, #7a5af8);
  }

  .like-button::before,
  .like-button::after {
    content: "";
    position: absolute;
    inset: var(--space);
    transition: all 0.5s ease-in-out;
    border-radius: calc(var(--round) - var(--space));
    z-index: 0;
  }

  .like-button::before {
    --space: 1px;
    background: linear-gradient(
      177.95deg,
      rgba(255, 255, 255, 0.19) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  .like-button::after {
    --space: 2px;
    background: radial-gradient(
        65.28% 65.28% at 50% 100%,
        rgba(223, 113, 255, 0.8) 0%,
        rgba(223, 113, 255, 0) 100%
      ),
      linear-gradient(0deg, #7a5af8, #7a5af8);
  }

  .like-button:hover:not(.liked) .like-icon {
    transform: scale(1.1) rotate(15deg);
  }

  .like-button:active:not(.liked) {
    transform: scale(0.95);
  }

  .like-button.liked {
    cursor: default;
  }

  /* Floating points animation */
  .points_wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
    pointer-events: none;
    position: absolute;
    z-index: 1;
  }

  .points_wrapper .point {
    bottom: -10px;
    position: absolute;
    animation: floating-points infinite ease-in-out;
    pointer-events: none;
    width: 2px;
    height: 2px;
    background-color: #fff;
    border-radius: 9999px;
  }

  @keyframes floating-points {
    0% {
      transform: translateY(0);
    }
    85% {
      opacity: 0;
    }
    100% {
      transform: translateY(-55px);
      opacity: 0;
    }
  }

  .points_wrapper .point:nth-child(1) {
    left: 10%;
    opacity: 1;
    animation-duration: 2.35s;
    animation-delay: 0.2s;
  }
  .points_wrapper .point:nth-child(2) {
    left: 30%;
    opacity: 0.7;
    animation-duration: 2.5s;
    animation-delay: 0.5s;
  }
  .points_wrapper .point:nth-child(3) {
    left: 25%;
    opacity: 0.8;
    animation-duration: 2.2s;
    animation-delay: 0.1s;
  }
  .points_wrapper .point:nth-child(4) {
    left: 44%;
    opacity: 0.6;
    animation-duration: 2.05s;
  }
  .points_wrapper .point:nth-child(5) {
    left: 50%;
    opacity: 1;
    animation-duration: 1.9s;
  }
  .points_wrapper .point:nth-child(6) {
    left: 75%;
    opacity: 0.5;
    animation-duration: 1.5s;
    animation-delay: 1.5s;
  }
  .points_wrapper .point:nth-child(7) {
    left: 88%;
    opacity: 0.9;
    animation-duration: 2.2s;
    animation-delay: 0.2s;
  }
  .points_wrapper .point:nth-child(8) {
    left: 58%;
    opacity: 0.8;
    animation-duration: 2.25s;
    animation-delay: 0.2s;
  }
  .points_wrapper .point:nth-child(9) {
    left: 98%;
    opacity: 0.6;
    animation-duration: 2.6s;
    animation-delay: 0.1s;
  }
  .points_wrapper .point:nth-child(10) {
    left: 65%;
    opacity: 1;
    animation-duration: 2.5s;
    animation-delay: 0.2s;
  }

  .like {
    width: 70%;
    height: 100%;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: space-evenly;
    transition: all 0.3s ease;
    z-index: 2;
  }

  .like.liked {
    cursor: default;
  }

  .like-icon {
    fill: rgba(255, 255, 255, 0.6);
    height: 24px;
    width: 24px;
    transition: all 0.3s ease;
  }

  .like.liked .like-icon,
  .on:checked ~ .like .like-icon {
    fill: #fc4e4e;
    animation: enlarge 0.3s ease-out 1;
    filter: drop-shadow(0 0 6px rgba(252, 78, 78, 0.8));
  }

  .like-text {
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .like-count-wrapper {
    position: absolute;
    right: 0;
    width: 32%;
    height: 100%;
    overflow: hidden;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 2;
  }

  .like-count {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    font-weight: 500;
    transition: all 0.5s ease-out;
  }

  .like-count.two {
    transform: translateY(48px);
  }

  .like-count.one.slid {
    transform: translateY(-48px);
  }

  .like-count.two.slid {
    transform: translateY(0);
    color: #ffffff;
  }

  @keyframes enlarge {
    0% {
      transform: scale(0.5);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default Likes;
