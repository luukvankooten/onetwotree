import { useEffect, useState } from "react";
import { newUserValidatorObject } from "@12tree/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Element from "../components/Form/Element";

type RegisterData = ReturnType<typeof newUserValidatorObject.validateSync>;

export default function Register() {
  // const [register, setRegister] = useState(null);

  const form = useForm<RegisterData>({
    resolver: yupResolver(newUserValidatorObject),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="rounded overflow-hidden shadow-xl p-6 ms:w-screen lg:w-3/12 bg-white">
        <div className="px-6 py-4">
          <div className="text-center">
            <h1 className="font-bold mb-2 text-3xl">Registeren</h1>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <Element
            labelText="email"
            name="email"
            type="email"
            formHook={form}
          />
        </form>
      </div>
    </div>
  );
}
