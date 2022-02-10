import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../app/hooks";
import { add, createComment } from "../commentSlice";

type FormData = {
  comment: string;
};

interface CreateCommentProps {
  trackId: string;
}

export default function Create({ trackId }: CreateCommentProps) {
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const onSubmit = handleSubmit((data) =>
    dispatch(createComment({ trackId, comment: data.comment }))
  );

  return (
    <form className="w-full max-w-lg" onSubmit={onSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Comment
          </label>
          <textarea
            className="pearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            {...register("comment", { required: true })}
          ></textarea>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          value="maken"
        />
      </div>
    </form>
  );
}
