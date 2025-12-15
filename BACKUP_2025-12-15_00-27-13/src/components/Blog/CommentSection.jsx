
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

const CommentSection = ({ slug }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([
    { id: 1, author: "Pierre D.", date: "2024-03-16", text: "Excellent article, très instructif !" }
  ]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setComments([
      { 
        id: Date.now(), 
        author: user?.name || "Invité", 
        date: new Date().toISOString().split('T')[0], 
        text: newComment 
      }, 
      ...comments
    ]);
    setNewComment("");
  };

  return (
    <div className="mt-16 pt-8 border-t border-white/10">
      <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
        <MessageSquare className="text-[#BFA76A]" /> Commentaires ({comments.length})
      </h3>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-10 bg-[#111] p-6 rounded-xl border border-white/10">
          <Textarea 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Partagez votre avis..."
            className="bg-[#0A0A0A] border-white/10 text-white min-h-[100px] mb-4"
          />
          <Button type="submit" className="bg-[#BFA76A] text-black font-bold">
            Publier <Send size={16} className="ml-2" />
          </Button>
        </form>
      ) : (
        <div className="bg-[#111] p-6 text-center rounded-xl border border-white/10 mb-10">
          <p className="text-gray-400 mb-4">Connectez-vous pour participer à la discussion.</p>
          <Link to="/login"><Button variant="outline" className="border-white/20 text-white">Se connecter</Button></Link>
        </div>
      )}

      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className="bg-[#111] p-6 rounded-xl border border-white/5">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-white">{comment.author}</span>
              <span className="text-xs text-gray-500">{comment.date}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
