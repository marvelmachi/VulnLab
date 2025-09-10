import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, AlertTriangle } from "lucide-react";
interface Comment {
  id: number;
  content: string;
  timestamp: string;
}
const VulnerableComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    // Load comments from localStorage (simulating a database)
    const savedComments = localStorage.getItem("vulnlab-comments");
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);
  const addComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now(),
      content: newComment,
      // VULNERABILITY: No XSS protection - directly storing user input
      timestamp: new Date().toLocaleString()
    };
    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    localStorage.setItem("vulnlab-comments", JSON.stringify(updatedComments));
    setNewComment("");
  };
  const clearComments = () => {
    setComments([]);
    localStorage.removeItem("vulnlab-comments");
  };
  return <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-danger" />
            <CardTitle>Community Comments</CardTitle>
            
          </div>
          <Button variant="destructive" size="sm" onClick={clearComments}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea placeholder="Share your thoughts..." value={newComment} onChange={e => setNewComment(e.target.value)} className="min-h-20" />
          <Button onClick={addComment} className="w-full">
            Post Comment
          </Button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {comments.length === 0 ? <p className="text-muted-foreground text-center py-8">
              No comments yet. Be the first to comment!
            </p> : comments.map(comment => <div key={comment.id} className="p-4 rounded-lg bg-secondary border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {comment.timestamp}
                  </span>
                </div>
                {/* VULNERABILITY: Directly rendering HTML content without sanitization */}
                <div className="text-foreground" dangerouslySetInnerHTML={{
            __html: comment.content
          }} />
              </div>)}
        </div>
      </CardContent>
    </Card>;
};
export default VulnerableComments;