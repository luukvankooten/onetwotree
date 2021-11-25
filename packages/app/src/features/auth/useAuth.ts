import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { push } from "redux-first-history";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getLoad, getState, Status, fetchUser } from "./authSlice";

export const foo = "foo";

export default function useAuth(): Status {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const dispatch = useAppDispatch();
  const status = useAppSelector(getState);
  const load = useAppSelector(getLoad);

  useEffect(() => {
    const jwt = cookies.jwt ?? "";

    if (status === Status.IDLE) {
      dispatch(fetchUser(jwt));
    }
  }, [dispatch, status, cookies]);

  return status;
}
