import type React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { FaComment } from "react-icons/fa";
import { TiPinOutline } from "react-icons/ti";
import pf from "@/assets/pf1.webp";
import CommentItem, { type Comment } from "./CommentItem";
import { formatTimeAgo } from "@/lib/utils";
import styles from "@/styles/Contact.module.css";
import CreditsButton from "@/components/CreditsButton";
import { triggerConfettiSideCannons } from "@/lib/confetti";
import ToastFloatingPoints from "@/components/ui/ToastFloatingPoints";

const CommentsSection = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [commentData, setCommentData] = useState({
    name: "",
    comment: "",
    profilePhoto: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [timeAgoRefresh, setTimeAgoRefresh] = useState(0);

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
  }, [timeAgoRefresh]);

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

  const handleChoosePhoto = () => {
    fileInputRef.current?.click();
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

        const { error: uploadError } = await supabase.storage
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

      const { error: insertError } = await supabase
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

      triggerConfettiSideCannons();

      toast({
        title: "Comment Posted! ✨",
        description: (
          <div className="flex flex-col gap-1 relative z-10">
            <p className="font-medium">
              Thanks for sharing your thoughts, {commentData.name}!
            </p>
            <p className="text-sm text-gray-200">
              Your comment is now live on the page.
            </p>
            <ToastFloatingPoints />
          </div>
        ),
        style: {
          background: `radial-gradient(65.28% 65.28% at 50% 100%, rgba(223, 113, 255, 0.8) 0%, rgba(223, 113, 255, 0) 100%), linear-gradient(0deg, #7a5af8, #7a5af8)`,
          border: "none",
          color: "white",
          overflow: "hidden",
        },
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
        className: "bg-red-500 border border-red-500/20",
      });
    } finally {
      setIsCommentLoading(false);
    }
  };

  return (
    <div
      data-aos="fade-left"
      data-aos-delay="200"
      className=" bg-gradient-to-r from-cyan-500/20 to-purple-400/20 md:p-8 p-4 rounded-2xl flex flex-col h-[950px]"
    >
      <div className="flex items-center justify-between mb-5 md:mb-6">
        <div className="flex items-center gap-2">
          <div
            data-aos="fade-left"
            data-aos-delay="300"
            className="bg-gradient-to-r from-cyan-500/20 to-purple-400/20 p-2 rounded-lg"
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

        <CreditsButton
          data-aos="fade-up"
          data-aos-delay="300"
          type="submit"
          disabled={isCommentLoading}
          text={isCommentLoading ? "Posting..." : "Post Comment"}
          className="w-full"
          icon={<FaComment className="text-sm" />}
        />
      </form>

      <div className={`flex-1 ${styles.custom_scrollbar}`}>
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="space-y-2 md:space-y-3 pr-2"
        >
          {/* Pinned Comment */}
          <div className="flex flex-col items-start gap-2 p-2 md:p-3 rounded-lg bg-gradient-to-r from-cyan-500/30 to-purple-400/30">
            <div className="flex items-center gap-2">
              <TiPinOutline className="text-cosmic-cyan text-2xl" />
              <p className="text-gray-300 text-sm">Pined Comment</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-11 h-11 border-[2px] border-cyan-600 rounded-full overflow-hidden">
                <img
                  src={pf}
                  alt={"sokchanyan"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h4 className="text-white font-medium">Sokchan Yan</h4>
                  <span className="text-gray-500 text-sm">
                    {formatTimeAgo("2025-12-17 18:30:00")}
                  </span>
                </div>
                <p className="text-gray-300 mt-1">
                  Thank you for visiting me. I would appreciate any questions or
                  feedback you might have.
                </p>
              </div>
            </div>
          </div>

          {/* User Comments */}
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
