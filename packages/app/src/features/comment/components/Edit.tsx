import { useForm } from "react-hook-form";
import { Comment } from "@12tree/domain";
import { updateComment } from "../commentSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";

type FormData = {
  comment: string;
};

type EditProps = {
  index: number;
  toggle: () => void;
  comment: Comment;
};

export default function Edit({ index, toggle, comment }: EditProps) {
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const onSubmit = handleSubmit((data) => {
    dispatch(updateComment({ id: comment.id, comment: data.comment }));

    toggle();
  });

  return (
    <form className="w-full max-w-lg" onSubmit={onSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="comment"
          >
            Comment
          </label>
          <textarea
            id="comment"
            data-testid="comment"
            className="ppearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            {...register("comment", { required: true, value: comment.comment })}
          ></textarea>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Wijzigen
        </button>
      </div>
    </form>
  );
}
