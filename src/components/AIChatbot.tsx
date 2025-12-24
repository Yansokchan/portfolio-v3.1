import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat";
import { sendMessageToOpenRouter } from "@/lib/openrouter";
import Particles from "@/components/Particles";
import { AuroraText } from "./ui/aurora-text";
import astronaut from "../assets/astronaut.webp";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Memoize particle colors to prevent re-renders
const PARTICLE_COLORS = ["#4DEEEA", "#9B59B6", "#FFFFFF"];

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! 👋 I'm Sokchan's AI assistant. Feel free to ask me anything about his background, skills, or experience!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      // Prepare history for API
      // We exclude any error messages or temporary states if we had them,
      // but here we just map the main messages state.
      // We also include the current user message which was just added to local state.
      const history = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await sendMessageToOpenRouter(history);

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(errorMessage);

      // Add error message as assistant response
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: `⚠️ ${errorMessage}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ExpandableChat
      position="bottom-right"
      size="md"
      icon={<Sparkles className="h-6 w-6" />}
    >
      {/* Global Particles Background - behind content, listens on window for 3D hover */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleCount={100}
          particleSpread={5}
          speed={0.03}
          particleColors={PARTICLE_COLORS}
          moveParticlesOnHover={true}
          particleHoverFactor={1}
          alphaParticles={true}
          particleBaseSize={60}
          sizeRandomness={0.5}
          cameraDistance={15}
          className="w-full h-full"
        />
      </div>

      {/* Header */}
      <ExpandableChatHeader className="border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <img className="w-10 rounded-full" src={astronaut} alt="astronaut" />
          <div>
            <AuroraText className="font-semibold text-white">
              Ask About Sokchan
            </AuroraText>

            <p className="text-xs text-gray-400">Powered by OpenRouter AI</p>
          </div>
        </div>
      </ExpandableChatHeader>

      {/* Body */}
      <ExpandableChatBody
        className="relative z-10 bg-transparent"
        style={{ minHeight: "300px" }}
      >
        {/* Messages Content */}
        <div className="p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 mt-1 rounded-full flex-shrink-0 flex items-center justify-center ${
                    message.role === "user" ? "bg-cosmic-purple/50" : ""
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <img
                      className="w-8 rounded-full"
                      src={astronaut}
                      alt="astronaut"
                    />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 backdrop-blur-sm ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-cosmic-purple to-cosmic-cyan text-white"
                      : "bg-white/10 text-gray-200 border border-white/10"
                  }`}
                >
                  <div className="text-sm markdown-content">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cosmic-cyan underline hover:text-cosmic-purple transition-colors"
                          />
                        ),
                        p: ({ node, ...props }) => (
                          <p {...props} className="mb-2 last:mb-0" />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            {...props}
                            className="list-disc list-inside mb-2"
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            {...props}
                            className="list-decimal list-inside mb-2"
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li {...props} className="mb-1" />
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-3">
                <img
                  className="w-8 rounded-full"
                  src={astronaut}
                  alt="astronaut"
                />
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 text-cosmic-cyan animate-spin" />
                    <span className="text-sm text-gray-400">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </ExpandableChatBody>

      {/* Footer - Telegram Style */}
      <ExpandableChatFooter className="relative z-10 p-3 flex justify-center">
        {/* Telegram-style Input Container with width animation */}
        <div
          className={`relative flex items-center border bg-transparent border-white/10 rounded-3xl px-4 py-2 backdrop-blur-sm transition-all duration-300 ease-out focus-within:ring-2 focus-within:ring-cosmic-cyan/50 focus-within:border-transparent ${
            isInputFocused ? "w-[95%]" : "w-[85%]"
          }`}
        >
          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => !inputValue.trim() && setIsInputFocused(false)}
            placeholder="Ask about Sokchan..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none disabled:opacity-50 pr-2"
          />
          {/* Animated Send Button */}
          <div
            className={`transition-all scale-110 duration-300 ${
              inputValue.trim() && !isLoading
                ? "opacity-100 translate-x-2 translate-y-0"
                : "opacity-0 translate-x-0 translate-y-1"
            }`}
          >
            <button
              onClick={() => {
                handleSendMessage();
                setIsInputFocused(false);
              }}
              disabled={!inputValue.trim() || isLoading}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-cosmic-purple to-cosmic-cyan hover:opacity-90 flex items-center justify-center transition-all disabled:opacity-50 flex-shrink-0"
            >
              <Send className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
};

export default AIChatbot;
