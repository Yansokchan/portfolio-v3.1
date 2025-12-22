"use client";

import React, { useRef, useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type ChatPosition = "bottom-right" | "bottom-left";
export type ChatSize = "sm" | "md" | "lg" | "xl" | "full";

const chatConfig = {
  dimensions: {
    sm: "sm:max-w-sm sm:max-h-[500px]",
    md: "sm:max-w-md sm:max-h-[600px]",
    lg: "sm:max-w-lg sm:max-h-[700px]",
    xl: "sm:max-w-xl sm:max-h-[800px]",
    full: "sm:w-full sm:h-full",
  },
  positions: {
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
  },
  chatPositions: {
    "bottom-right": "sm:bottom-[calc(100%+10px)] sm:right-0",
    "bottom-left": "sm:bottom-[calc(100%+10px)] sm:left-0",
  },
  // Scale animation from toggle button position
  states: {
    open: "pointer-events-auto opacity-100 visible scale-100",
    closed: "pointer-events-none opacity-0 invisible sm:scale-0",
  },
};

interface ExpandableChatProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: ChatPosition;
  size?: ChatSize;
  icon?: React.ReactNode;
}

const ExpandableChat: React.FC<ExpandableChatProps> = ({
  className,
  position = "bottom-right",
  size = "md",
  icon,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  // Detect scroll position - hide button when near bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if user is within 100px of the bottom
      const nearBottom = scrollTop + windowHeight >= documentHeight - 100;
      setIsAtBottom(nearBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        `fixed ${chatConfig.positions[position]} z-50 flex flex-col items-end`,
        className
      )}
      {...props}
    >
      {/* Chat Panel - positioned above toggle button */}
      <div
        ref={chatRef}
        className={cn(
          "flex flex-col bg-black border border-white/10 sm:rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-out sm:w-[90vw] sm:h-[85vh] sm:mb-3 fixed inset-0 w-full h-full sm:relative sm:inset-auto origin-bottom-right",
          chatConfig.dimensions[size],
          isOpen ? chatConfig.states.open : chatConfig.states.closed,
          className
        )}
      >
        {children}
        {/* Close Button - visible on all screens */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-50 bg-black/50 hover:bg-black/70 text-white"
          onClick={toggleChat}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Toggle Button - hidden when chat is open or at bottom of page */}
      {!isOpen && (
        <div
          className={`transition-all duration-300 ease-out ${
            isAtBottom
              ? "opacity-0 scale-0 pointer-events-none"
              : "opacity-100 scale-100"
          }`}
        >
          <ExpandableChatToggle
            icon={icon}
            isOpen={isOpen}
            toggleChat={toggleChat}
          />
        </div>
      )}
    </div>
  );
};

ExpandableChat.displayName = "ExpandableChat";

const ExpandableChatHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex items-center justify-between p-4 border-b", className)}
    {...props}
  />
);

ExpandableChatHeader.displayName = "ExpandableChatHeader";

const ExpandableChatBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("flex-grow overflow-y-auto", className)} {...props} />;

ExpandableChatBody.displayName = "ExpandableChatBody";

const ExpandableChatFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("p-4", className)} {...props} />;

ExpandableChatFooter.displayName = "ExpandableChatFooter";

interface ExpandableChatToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  isOpen: boolean;
  toggleChat: () => void;
}

const ExpandableChatToggle: React.FC<ExpandableChatToggleProps> = ({
  className,
  icon,
  isOpen,
  toggleChat,
  ...props
}) => (
  <button
    data-aos="zoom-in"
    data-aos-duration="300"
    onClick={toggleChat}
    className={cn(
      "w-14 h-14 rounded-full shadow-md flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 active:scale-95 text-white border border-white/20 overflow-hidden relative",
      className
    )}
    style={{
      background: `radial-gradient(65.28% 65.28% at 50% 100%, rgba(223, 113, 255, 0.8) 0%, rgba(223, 113, 255, 0) 100%), linear-gradient(0deg, #7a5af8, #7a5af8)`,
    }}
    {...props}
  >
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
    {isOpen ? (
      <X className="h-6 w-6 relative z-10" />
    ) : (
      <span className="relative z-10">
        {icon || <MessageCircle className="h-6 w-6" />}
      </span>
    )}
  </button>
);

ExpandableChatToggle.displayName = "ExpandableChatToggle";

export {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
};
