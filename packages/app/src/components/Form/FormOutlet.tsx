import { FormEventHandler } from "react";

interface FormOutletProps {
  onSubmit: FormEventHandler;
  children: JSX.Element;
  title: string;
}

export default function FormOutlet({
  children,
  onSubmit,
  title,
}: FormOutletProps) {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="rounded overflow-hidden shadow-xl p-6 ms:w-screen lg:w-3/12 bg-white">
        <div className="px-6 py-4">
          <div className="text-center">
            <h1 className="font-bold mb-2 text-3xl">{title}</h1>
          </div>
        </div>
        <form onSubmit={onSubmit}>{children}</form>
      </div>
    </div>
  );
}
