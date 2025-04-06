import { useRef, useState, useEffect, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@supabase/supabase-js";
import styles from "@/styles/Contact.module.css";

// Initialize Supabase client
const supabaseUrl = "https://vkxlcowblrveznxsradv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZreGxjb3dibHJ2ZXpueHNyYWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMjA5NDAsImV4cCI6MjA1ODg5Njk0MH0.MEI4Bl7Ph_b1xJWkD5-Gq1zPEE9tx9pkwJahl3756J0";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Comment {
  id: number;
  name: string;
  comment: string;
  time: string;
  created_at: string;
  profile_image?: string;
}

const Contact = () => {
  const sectionRef = useRef(null);

  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [commentData, setCommentData] = useState({
    name: "",
    comment: "",
    profilePhoto: null as File | null,
  });

  const [comments, setComments] = useState<Comment[]>([]);
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [timeAgoRefresh, setTimeAgoRefresh] = useState(0);

  // Add a ref for the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatTimeAgo = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInSeconds < 60) {
      return "just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays}d ago`;
    } else {
      return `${diffInMonths}mo ago`;
    }
  }, []);

  // Update times every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgoRefresh((prev) => prev + 1);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Fetch comments on component mount
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedComments = data.map((comment) => ({
        ...comment,
        time: formatTimeAgo(comment.created_at),
      }));

      setComments(formattedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast({
        title: "Error",
        description: "Failed to load comments. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCommentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCommentData((prev) => ({ ...prev, profilePhoto: file }));

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Add a click handler for the button
  const handleChoosePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "68a4d70f-7e45-422f-bf56-42afeed37f1c",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "New Contact Form Submission",
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: "Message Sent Successfully! 🚀",
          description: (
            <div className="flex flex-col gap-1">
              <p className="font-medium">
                Thank you for reaching out, {formData.name}!
              </p>
              <p className="text-sm text-gray-400">
                I'll get back to you as soon as possible.
              </p>
            </div>
          ),
          className:
            "bg-gradient-to-r from-cyan-500/20 to-purple-400/20 border border-cyan-500/20 text-white",
        });
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Oops! Something went wrong 😕",
        description: (
          <div className="flex flex-col gap-1">
            <p className="font-medium">Failed to send your message.</p>
            <p className="text-sm text-gray-400">
              Please try again or contact me directly via email.
            </p>
          </div>
        ),
        variant: "destructive",
        className: "bg-red-500/20 border border-red-500/20",
      });
    } finally {
      setIsContactLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCommentLoading(true);

    try {
      let profile_image_url = null;

      // Upload image if one is selected
      if (commentData.profilePhoto) {
        const fileExt = commentData.profilePhoto.name.split(".").pop();
        const fileName = `${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("profile-images")
          .upload(filePath, commentData.profilePhoto);

        if (uploadError) {
          throw new Error(`Failed to upload image: ${uploadError.message}`);
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("profile-images").getPublicUrl(filePath);

        profile_image_url = publicUrl;
      }

      const { data: insertData, error: insertError } = await supabase
        .from("comments")
        .insert([
          {
            name: commentData.name,
            comment: commentData.comment,
            profile_image: profile_image_url,
          },
        ])
        .select();

      if (insertError) {
        throw new Error(`Failed to post comment: ${insertError.message}`);
      }

      toast({
        title: "Comment Posted! ✨",
        description: (
          <div className="flex flex-col gap-1">
            <p className="font-medium">
              Thanks for sharing your thoughts, {commentData.name}!
            </p>
            <p className="text-sm text-gray-400">
              Your comment is now live on the page.
            </p>
          </div>
        ),
        className:
          "bg-gradient-to-r from-cyan-500/20 to-purple-400/20 border border-cyan-500/20 text-white",
      });

      setCommentData({
        name: "",
        comment: "",
        profilePhoto: null,
      });
      setPreviewUrl(null);

      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
      toast({
        title: "Comment Posting Failed 😔",
        description: (
          <div className="flex flex-col gap-1">
            <p className="font-medium">Unable to post your comment.</p>
            <p className="text-sm text-gray-400">
              {error instanceof Error
                ? error.message
                : "Please try again later."}
            </p>
          </div>
        ),
        variant: "destructive",
        className: "bg-red-500/20 border border-red-500/20",
      });
    } finally {
      setIsCommentLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section
      id="contact"
      className="section !px-[25px] md:!px-8"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto">
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Contact</span> Me
          </h2>
          <p className="text-gray-400">
            Got a question? Send me a message, and I'll get back to you soon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Get in Touch Form */}
          <div
            data-aos="fade-right"
            data-aos-delay="200"
            className="bg-gradient-to-r from-cyan-500/20 to-purple-400/20 p-4 md:p-8 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                data-aos="fade-right"
                data-aos-delay="300"
                className="text-[24px] text-cosmic-cyan font-semibold"
              >
                Get in Touch
              </h3>
              <button
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-cosmic-cyan"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </button>
            </div>

            <p
              data-aos="fade-right"
              data-aos-delay="300"
              className="text-gray-400 text-[18px] mb-6 md:mb-8"
            >
              Have something to discuss? Send me a message and let's talk.
            </p>

            <form
              onSubmit={handleContactSubmit}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative"
            >
              <div className="mb-5 md:mb-6">
                <label
                  data-aos="fade-right"
                  data-aos-delay="300"
                  htmlFor="name"
                  className="block text-gray-400 text-sm mb-2"
                >
                  Name*
                </label>
                <input
                  data-aos="fade-up"
                  data-aos-delay="300"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cosmic-cyan transition-colors"
                  required
                />
              </div>

              <div className="mb-5 md:mb-6">
                <label
                  data-aos="fade-right"
                  data-aos-delay="300"
                  htmlFor="email"
                  className="block text-gray-400 text-sm mb-2"
                >
                  Email*
                </label>
                <input
                  data-aos="fade-up"
                  data-aos-delay="300"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cosmic-cyan transition-colors"
                  required
                />
              </div>

              <div className="mb-5 md:mb-6">
                <label
                  data-aos="fade-right"
                  data-aos-delay="300"
                  htmlFor="message"
                  className="block text-gray-400 text-sm mb-2"
                >
                  Message*
                </label>
                <textarea
                  data-aos="fade-up"
                  data-aos-delay="300"
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cosmic-cyan transition-colors resize-none"
                  required
                />
              </div>

              <button
                data-aos="fade-up"
                data-aos-delay="300"
                type="submit"
                disabled={isContactLoading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-400 text-white rounded-lg hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-purple-700/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isContactLoading ? "Sending..." : "Send Message"}
              </button>
            </form>

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
                  <div className="flex items-start">
                    <div
                      data-aos="fade-right"
                      data-aos-delay="300"
                      className="bg-cosmic-purple/20 p-3 rounded-lg mr-4"
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

                  <div className="flex items-start">
                    <div
                      data-aos="fade-right"
                      data-aos-delay="300"
                      className="bg-cosmic-purple/20 p-3 rounded-lg mr-4"
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
                        <button
                          data-aos="fade-left"
                          data-aos-delay="1000"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              "yansokchan05@gmail.com"
                            );
                            toast({
                              title: "Email Copied! 📋",
                              description:
                                "The email address has been copied to your clipboard.",
                              className:
                                "bg-gradient-to-r from-cyan-500/20 to-purple-400/20 border border-cyan-500/20 text-white",
                            });
                          }}
                          className="p-1.5 rounded-lg bg-cosmic-purple/20 hover:bg-cosmic-purple/30 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-cosmic-cyan"
                          >
                            <rect
                              x="9"
                              y="9"
                              width="13"
                              height="13"
                              rx="2"
                              ry="2"
                            />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div
                      data-aos="fade-right"
                      data-aos-delay="300"
                      className="bg-cosmic-purple/20 p-3 rounded-lg mr-4"
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
                        href="#"
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
                      </a>
                      <a
                        data-aos="fade-up"
                        data-aos-delay="400"
                        href="#"
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
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                      </a>
                      <a
                        data-aos="fade-up"
                        data-aos-delay="500"
                        href="#"
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
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5 0-.29-.01-.58-.04-.87A7.72 7.72 0 0 0 23 3z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Comments Section */}
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            className="bg-gradient-to-r from-cyan-500/20 to-purple-400/20 md:p-8 p-4 rounded-2xl flex flex-col h-[950px]"
          >
            <div className="flex items-center justify-between mb-5 md:mb-6">
              <div className="flex items-center gap-2">
                <div
                  data-aos="fade-left"
                  data-aos-delay="300"
                  className="bg-cosmic-purple/20 p-2 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cosmic-cyan"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <path d="M8 10h.01" />
                    <path d="M12 10h.01" />
                    <path d="M16 10h.01" />
                  </svg>
                </div>
                <h3
                  data-aos="fade-left"
                  data-aos-delay="400"
                  className="text-[24px] text-cosmic-cyan font-semibold flex items-center gap-2"
                >
                  Comments
                  <span
                    data-aos="fade-left"
                    data-aos-delay="500"
                    className="text-base font-normal text-cyan-400"
                  >
                    ({comments.length})
                  </span>
                </h3>
              </div>
            </div>

            <form onSubmit={handleCommentSubmit} className="mb-5 md:mb-6">
              <div className="mb-3 md:mb-4">
                <label
                  data-aos="fade-left"
                  data-aos-delay="300"
                  htmlFor="comment-name"
                  className="block text-gray-400 text-sm mb-2"
                >
                  Name*
                </label>
                <input
                  data-aos="fade-up"
                  data-aos-delay="300"
                  type="text"
                  id="comment-name"
                  name="name"
                  value={commentData.name}
                  onChange={handleCommentChange}
                  placeholder="Enter your name"
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cosmic-cyan transition-colors"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  data-aos="fade-left"
                  data-aos-delay="300"
                  htmlFor="comment-text"
                  className="block text-gray-400 text-sm mb-2"
                >
                  Comment*
                </label>
                <textarea
                  data-aos="fade-up"
                  data-aos-delay="300"
                  id="comment-text"
                  name="comment"
                  rows={3}
                  value={commentData.comment}
                  onChange={handleCommentChange}
                  placeholder="Write your comment here..."
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cosmic-cyan transition-colors resize-none"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  data-aos="fade-left"
                  data-aos-delay="300"
                  className="block text-gray-400 text-sm mb-2"
                >
                  Profile Photo (optional)
                </label>
                <div
                  data-aos="fade-up"
                  onClick={handleChoosePhoto}
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 flex items-center justify-center cursor-pointer hover:border-cosmic-cyan transition-colors"
                >
                  {previewUrl ? (
                    <div className="relative w-20 h-20">
                      <img
                        data-aos="zoom-in"
                        data-aos-delay="300"
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-full"
                      />
                      <button
                        data-aos="fade-left"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewUrl(null);
                          setCommentData((prev) => ({
                            ...prev,
                            profilePhoto: null,
                          }));
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <span
                      data-aos="fade-left"
                      data-aos-delay="300"
                      className="text-cosmic-cyan"
                    >
                      📎 Choose Profile Photo
                    </span>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <p
                  data-aos="fade-right"
                  data-aos-delay="300"
                  className="text-gray-500 text-xs mt-1"
                >
                  Max file size: 5MB
                </p>
              </div>

              <button
                data-aos="fade-up"
                data-aos-delay="300"
                type="submit"
                disabled={isCommentLoading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-400 text-white rounded-lg hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-purple-700/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCommentLoading ? "Posting..." : "Post Comment"}
              </button>
            </form>

            <div className={`flex-1 ${styles.custom_scrollbar}`}>
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="space-y-2 md:space-y-3 pr-2"
              >
                {comments.map((comment, index) => (
                  <div
                    key={comment.id}
                    className="flex items-start gap-2 p-2 md:p-3 rounded-lg bg-gradient-to-r from-cyan-500/15 to-purple-400/15"
                  >
                    {comment.profile_image ? (
                      <div className="w-11 h-11 border-[2px] border-cyan-600 rounded-full overflow-hidden">
                        <img
                          src={comment.profile_image}
                          alt={comment.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-11 h-11 border-[2px] border-cyan-600 rounded-full bg-gradient-to-br from-cosmic-purple/30 to-cosmic-cyan/30 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-cosmic-cyan"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-medium">
                          {comment.name}
                        </h4>
                        <span className="text-gray-500 text-sm">
                          {formatTimeAgo(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-gray-400 mt-1">{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
