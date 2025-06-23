
import React from 'react';
import { Avatar } from './Avatar';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  user_id: string;
  text: string;
  created_at: string;
}

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const timeAgo = formatDistanceToNow(new Date(comment.created_at), { addSuffix: true });

  return (
    <div className="flex space-x-3 animate-fade-in">
      <Avatar userId={comment.user_id} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="bg-gray-50 rounded-2xl px-4 py-3">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-semibold text-gray-900 text-sm">
              User {comment.user_id.slice(0, 8)}
            </span>
            <span className="text-gray-500 text-xs">{timeAgo}</span>
          </div>
          <p className="text-gray-800 text-sm leading-relaxed">{comment.text}</p>
        </div>
      </div>
    </div>
  );
};