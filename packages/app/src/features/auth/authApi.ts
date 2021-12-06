import { User } from "@12tree/domain";

export async function fetchByCredentials(login: {
  password: string;
  email: string;
}): Promise<[number, User]> {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(
    `${process.env.REACT_APP_API_URL || ""}/auth/login`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(login),
    }
  );

  return [response.status, (await response.json()) as User];
}

export async function fetchByToken(token: string): Promise<[number, User]> {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const response = await fetch(
    `${process.env.REACT_APP_API_URL || ""}/api/v1/users/me`,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  );

  return [response.status, (await response.json()) as User];
}
