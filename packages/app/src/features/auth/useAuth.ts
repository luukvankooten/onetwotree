import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUser, getState, Status } from "./authSlice";

export default function useAuth(): Status {
  const [cookies, _setCookie, _removeCookie] = useCookies(["jwt"]);
  const dispatch = useAppDispatch();
  const status = useAppSelector(getState);

  useEffect(() => {
    const jwt = cookies.jwt ?? "";

    if (status === Status.IDLE) {
      dispatch(fetchUser(jwt));
    }
  }, [dispatch, status, cookies]);

  return status;
}
