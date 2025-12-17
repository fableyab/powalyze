/**
 * TaskCommentFeed Component
 * Display comments and activity log with real-time updates
 * Mobile-first responsive design
 */

import React, { useState } from 'react';
import { Send, Loader, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTaskComments, useAddComment } from '@/hooks/useProjects';

const TaskCommentFeed = ({ taskId }) => {
  const [comment, setComment] = useState('');
  const { comments, loading } = useTaskComments(taskId);
  const { addComment, loading: isAdding } = useAddComment();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    // Get current user ID from auth context/store
    const userId = 'current-user-id';
    await addComment(taskId, comment, userId);
    setComment('');
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) {
      const mins = Math.floor(diff / (1000 * 60));
      return `${mins}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return d.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="space-y-4">
      {/* Comments list */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader className="w-5 h-5 animate-spin text-gray-400" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">No comments yet. Start the conversation!</p>
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-700">
                {comment.user?.full_name?.charAt(0) || '?'}
              </div>

              {/* Comment content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {comment.user?.full_name || 'Unknown'}
                  </p>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 break-words">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add comment form */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 pt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            disabled={isAdding}
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <Button
            type="submit"
            size="sm"
            disabled={!comment.trim() || isAdding}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskCommentFeed;
