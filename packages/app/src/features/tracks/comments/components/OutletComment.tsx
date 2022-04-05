import { UseFormRegister } from "react-hook-form";

interface OutletComment<T> {
  onSubmit: () => void;
  register: () => T;
}

export default function OutletComment<T>({
  onSubmit,
  register,
}: OutletComment<T>) {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-wrap">
        <div className="w-full">
          <textarea
            data-testid="comment"
            className="box-border block w-full h-40 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none rounded-md"
            {...register()}
          ></textarea>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto"
          type="submit"
          value="👍"
        />
      </div>
    </form>
  );
}
