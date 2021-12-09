import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginUserValidatorObject } from "@12tree/validation";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../features/auth/useAuth";
import { Status } from "../features/auth/authSlice";

type LoginData = ReturnType<typeof loginUserValidatorObject.validateSync>;

export default function Login() {
  const [status, authenticate] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LoginData>({
    resolver: yupResolver(loginUserValidatorObject),
  });

  const onSubmit = handleSubmit(async (data) => {
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
              {...register("email", { onBlur: () => trigger("email") })}
              id="email"
              type="text"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">* {errors.email.message}</p>
            )}
          </div>
          <div className="mb-8">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="password"
            >
              Wachtwoord
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
              {...register("password", { onBlur: () => trigger("password") })}
              id="password"
              type="password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">
                * {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-8">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-4 rounded w-full text-base inline-flex items-center justify-center"
            >
              Login
            </button>
          </div>
          <Link className="hover:text-green-700 text-green-500" to="/forgotten">
            Wachtwoord vergeten?
          </Link>
        </form>
      </div>
    </div>
  );
}
