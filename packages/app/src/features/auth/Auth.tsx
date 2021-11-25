import React from "react";
import { Navigate } from "react-router-dom";
import { Status } from "./authSlice";
import useAuth from "./useAuth";

type AuthProps = {
  children: JSX.Element;
};

export default function Auth({ children }: AuthProps) {
  const status = useAuth();

  if (status === Status.UNAUTHORIZEDSTATE) {
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
