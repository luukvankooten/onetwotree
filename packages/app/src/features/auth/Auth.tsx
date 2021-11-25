import React, { ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";
import Login from "../../routes/Login";
import {
  getState,
  isAuthenicated,
  fetchUser,
  getLoad,
  Status,
} from "./authSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import useAuth from "./useAuth";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { push } from "redux-first-history";

type AuthProps = {
  children: JSX.Element;
};

export default function Auth({ children }: AuthProps) {
  const status = useAuth();
  // const location = useLocation();

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
