import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { Status } from "./authSlice";
import useAuth from "./useAuth";

type AuthProps = {
  children: JSX.Element;
};

export default function Auth({ children }: AuthProps) {
  const [cookie, setCookie] = useCookies(["jwt"]);
  const [status, dispatch] = useAuth();

  if (cookie["jwt"]) {
    dispatch({ method: "token", token: cookie["jwt"] });
  }

  if (
    status === Status.UNAUTHORIZEDSTATE ||
    status === Status.IDLE ||
    status === Status.ERROR
  ) {
    return <Navigate to="/login" />;
  }

  if (status === Status.AUTHENICATED) {
    return children;
  }

  return <Loading />;
}

function Loading() {
  return <div>Loading</div>;
}
