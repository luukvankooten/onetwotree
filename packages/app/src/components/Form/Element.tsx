import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface ElementProps<T extends FieldValues> {
  labelText?: string;
  name: Path<T>;
  type?: string;
  formHook: UseFormReturn<T>;
  value?: string;
}

export default function Element<T extends FieldValues>({
  labelText,
  name,
  formHook,
  type = "text",
  value,
}: ElementProps<T>) {
  const {
    register,
    trigger,
    formState: { errors },
  } = formHook;

  return (
    <div className="mb-8">
      {labelText !== null && (
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor={name}
        >
          {labelText}
        </label>
      )}
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
        {...register(name, { onBlur: () => trigger(name) })}
        id={name}
        type={type}
      />
      {
        //@ts-ignore
        errors[name] && (
          <p className="text-red-500 text-xs">
            *{" "}
            {
              //@ts-ignore
              errors[name.toString()].message
            }
          </p>
        )
      }
    </div>
  );
}
