import Show from "./components/Show";
import { Comment } from "@12tree/domain";

interface CommentProps {
  comments: Comment[];
}

export default function ({ comments }: CommentProps) {
  return (
    <div>
      {comments.map((comment, index) => (
        <Show key={index.toString()} index={index} comment={comment} />
      ))}
    </div>
  );
}
