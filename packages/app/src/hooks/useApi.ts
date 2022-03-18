import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../features/auth/authSlice";
import ApiFetch from "../utils/apiFetch";

interface Loading {
  status: "loading";
}

interface Fetched<T> {
  status: "fetched";
  payload: T;
}

type Response<T> = Loading | Fetched<T>;

export function useApi<T>(path: string): Response<T> {
  const user = useSelector(getUser);
  const [resp, setResp] = useState<Response<T>>({ status: "loading" });

  useEffect(() => {
    async function fetch() {
      const apiResp = await ApiFetch<T>(user.token.accessToken, path);

      setResp({
        status: "fetched",
        payload: apiResp,
      });
    }

    fetch();
  }, [user, path]);

  return resp;
}
