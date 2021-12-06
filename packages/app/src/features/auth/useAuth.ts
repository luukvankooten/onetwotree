import { useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AuthMethod, fetchAuth, getLoad, Status } from "./authSlice";

export default function useAuth(): [Status, (auth: AuthMethod) => void] {
  const [cookies, setCookie] = useCookies(["jwt"]);
  const dispatch = useAppDispatch();
  const load = useAppSelector(getLoad);
  const status = load.status;

  const callback = useCallback(
    (auth: AuthMethod) => {
      if (status !== Status.AUTHENICATED) {
        dispatch(fetchAuth(auth));
      }
    },
    [status, dispatch, fetchAuth]
  );

  useEffect(() => {
    console.log(cookies["jwt"], "hello world");
    if (load.status === Status.AUTHENICATED && !cookies["jwt"]) {
      setCookie("jwt", load.user.token.accessToken);
      console.log(cookies["jwt"]);
    }
  }, [status]);

  return [status, callback];
}
