import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface BarProps {
  trigger: (data: string) => void;
  onSubmit: (data: string) => void;
}

type BarForm = { query: string };

export default function Bar({ trigger, onSubmit }: BarProps) {
  const { register, handleSubmit, watch } = useForm<BarForm>();

  const submit = handleSubmit((data) => onSubmit(data.query));
  const watchSearch = watch(["query"]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      trigger(value?.query || "")
    );
    return () => subscription.unsubscribe();
  }, [watchSearch]);

  return (
    <form className="flex w-auto h-14" onSubmit={submit}>
      <input
        className="flex-1 px-3 py-3 rounded-l bg-transparent text-lg"
        {...register("query")}
        type="search"
        placeholder="Lekker nummertje"
        autoComplete="off"
      />
      <button className="flex-shrink p-3 h-full" type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
}
