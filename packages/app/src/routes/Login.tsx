import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginUserValidatorObject } from "@12tree/validation";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../features/auth/useAuth";
import { Status } from "../features/auth/authSlice";
import Element from "../components/Form/Element";
import SubmitButton from "../components/Form/SubmitButton";

type LoginData = ReturnType<typeof loginUserValidatorObject.validateSync>;

export default function Login() {
  const [status, authenticate] = useAuth();

  const form = useForm<LoginData>({
    resolver: yupResolver(loginUserValidatorObject),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    authenticate({ method: "credentials", ...data });
  });

  if (status === Status.AUTHENICATED) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="rounded overflow-hidden shadow-xl p-6 ms:w-screen lg:w-3/12 bg-white">
        <div className="px-6 py-4">
          <div className="text-center">
            <h1 className="font-bold mb-2 text-3xl">Inloggen</h1>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <Element
            labelText="Email"
            name="email"
            type="email"
            formHook={form}
          />
          <Element
            labelText="Wachtwoord"
            name="password"
            type="password"
            formHook={form}
          />
          <SubmitButton text="inloggen" />
          <div className="mb-2">
            <Link
              className="hover:text-green-700 text-green-500"
              to="/register"
            >
              Registeren
            </Link>
          </div>
          <div>
            <Link
              className="hover:text-green-700 text-green-500"
              to="/forgotten"
            >
              Wachtwoord vergeten?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
