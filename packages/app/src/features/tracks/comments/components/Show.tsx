import { Comment } from "@12tree/domain";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../app/hooks";
import useToggle from "../../../../hooks/useToggle";
import { getUser } from "../../../auth/authSlice";
import { removeComment } from "../commentActions";
import Edit from "./Edit";

type ShowProps = {
  index: number;
  comment: Comment;
};

export default function Show({ index, comment }: ShowProps) {
  const [isEdit, toggleEditMode] = useToggle();
  const user = useSelector(getUser);
  const dispatch = useAppDispatch();

  if (isEdit) {
    return <Edit index={index} toggle={toggleEditMode} comment={comment} />;
  }

  return (
    <div className="bg-white shadow-lg rounded">
      <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-base" data-testid="comment-show">
          {comment.comment}
        </dt>
      </div>
      <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          Datum: {new Date(comment.createdAt.valueOf()).toLocaleDateString()}
        </dt>
        <dt className="text-sm font-medium text-gray-500">
          geplaats door: {comment.user.name}
        </dt>
      </div>
      <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          {user.id === comment.user.id && (
            <>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => dispatch(removeComment({ id: comment.id }))}
              >
                🗑
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={toggleEditMode}
              >
                🖊
              </button>
            </>
          )}
        </dt>
      </div>
    </div>
  );
}
