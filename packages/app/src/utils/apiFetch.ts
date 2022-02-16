import { Unauthorized } from "@12tree/domain";

async function ApiFetch<T>(
  accessToken: string,
  path: string,
  requestInit?: RequestInit
): Promise<T> {
  const host = process.env.REACT_APP_API_URL || "";

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);
  headers.append("Content-Type", "application/json");

  const response = await fetch(`${host}/api/v1/${path}`, {
    headers,
    ...requestInit,
  });

  if (response.status === 401) {
    throw new Unauthorized();
  }

  return await response.json();
}

export default ApiFetch;
