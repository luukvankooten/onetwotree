import { useForm } from "react-hook-form";
import { Comment } from "@12tree/domain";
import { useAppDispatch } from "../../../../app/hooks";
import { updateComment } from "../commentActions";

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
    <form className="w-full bg-white rounded px-4 py-4" onSubmit={onSubmit}>
      <div className="flex flex-wrap">
        <div className="w-full mb-2">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="comment"
          >
            Comment
          </label>
          <textarea
            id="comment"
            data-testid="comment"
            className="block w-full h-64 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            {...register("comment", { required: true, value: comment.comment })}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 rounded text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            👍
          </button>
        </div>
      </div>
    </form>
  );
}
