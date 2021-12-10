import { stat } from "fs";
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

  if (status === Status.LOADING || (status === Status.IDLE && cookie["jwt"])) {
    return <Loading />;
  }

  if (status === Status.AUTHENICATED) {
    return children;
  }

  return <Navigate to="/login" />;
}

function Loading() {
  return <div>Loading</div>;
}
