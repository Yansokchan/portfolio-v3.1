import { formatTimeAgo } from "@/lib/utils";

export interface Comment {
  id: number;
  name: string;
  comment: string;
  time: string;
  created_at: string;
  profile_image?: string;
}

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="flex items-start gap-2 p-2 md:p-3 rounded-lg bg-gradient-to-r from-cyan-500/15 to-purple-400/15">
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
          <h4 className="text-white font-medium">{comment.name}</h4>
          <span className="text-gray-500 text-sm">
            {formatTimeAgo(comment.created_at)}
          </span>
        </div>
        <p className="text-gray-300 mt-1">{comment.comment}</p>
      </div>
    </div>
  );
};

export default CommentItem;
