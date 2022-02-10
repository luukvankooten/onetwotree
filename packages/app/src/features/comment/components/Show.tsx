import { Comment } from "@12tree/domain";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import useToggle from "../../../hooks/useToggle";
import { remove, removeComment, selectComment } from "../commentSlice";
import Edit from "./Edit";

type ShowProps = {
  index: number;
  comment: Comment;
};

export default function Show({ index, comment }: ShowProps) {
  const [isEdit, toggleEditMode] = useToggle();
  const dispatch = useAppDispatch();

  if (isEdit) {
    return <Edit index={index} toggle={toggleEditMode} comment={comment} />;
  }

  return (
    <div className="border-t border-gray-200">
      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt
          className="text-sm font-medium text-gray-500"
          data-testid="comment-show"
        >
          {comment.comment}
        </dt>
      </div>
      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          Datum: {new Date(comment.createdAt.valueOf()).toLocaleDateString()}
        </dt>
        <dt className="text-sm font-medium text-gray-500">
          geplaats door: {comment.user.name}
        </dt>
      </div>
      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => dispatch(removeComment({ id: comment.id }))}
          >
            Verwijder
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={toggleEditMode}
          >
            Wijzigen
          </button>
        </dt>
      </div>
    </div>
  );
}
