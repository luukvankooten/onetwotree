import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { Status } from "./authSlice";
import useAuth from "./useAuth";

type AuthProps = {
  children: JSX.Element;
};

export default function Auth({ children }: AuthProps) {
  const [cookie] = useCookies(["jwt"]);
  const [status] = useAuth();

  if (status === Status.LOADING || (status === Status.IDLE && cookie["jwt"])) {
    return <Loading />;
  }

  if (status === Status.AUTHENICATED) {
    return children;
  }

  return <Navigate to="/login" />;
}
