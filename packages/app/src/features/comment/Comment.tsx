import { useAppSelector } from "../../app/hooks";
import { selectComments } from "./commentSlice";
import Show from "./components/Show";
import Create from "./components/Create";

export default function Comment() {
  const comments = useAppSelector(selectComments);

  return (
    <div>
      <Create />
      {comments.map((comment, index) => (
        <Show key={index.toString()} index={index} comment={comment} />
      ))}
    </div>
  );
}
