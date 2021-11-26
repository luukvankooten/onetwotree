import { User } from "@12tree/domain";

export function fetchUser(token: string): Promise<[number, User]> {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imx1dWsxNzEiLCJ0b2tlbiI6IkJRQ3B6a0FwallxcldzcDdzb3c4TVhubGxSOFB5S3NlVVYxdkR3MHVESm5XNU9xUWFqSEF0S2RHeU50eV9MMHFjemtjSHo4N0ZqYlYwWEZNQ0hFN2FYTnVYU25reDlBbm5FdjZkRzZtRGlyNWVMQ2xMTmtleEZvc0pSZk9ndmo5amxncjdQZzJpZl91bXJQa3RPTDQxMTRnNnR5QU1nIiwiZW1haWwiOiIxNzFsdXVrQGdtYWlsLmNvbSIsIm5hbWUiOiJsdXVrMTcxIiwiaWF0IjoxNjM3ODQ0Mjg3fQ.X7hyVKjVdbKjwdRRzDhmizpmvj11IQf8RuNi0GoJ4Jw"
  );

  return fetch("http://localhost:4001/api/users/me", {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  })
    .then((response) => [response.status, response.json()])
    .catch((error) => error);
}
