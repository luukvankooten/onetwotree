import { User } from "@12tree/domain";

export function fetchUser(token: string): Promise<[number, User]> {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imx1dWsxNzEiLCJ0b2tlbiI6IkJRQjl1WjVRMlEtSnM1M0htYldnaExwRC0xYmFBQ2VHZmsxUEdWQ3FPd0N6Y1pfODFmS2lLR01xRlBfcFpIaGFBeTdrdWg5X1VlTkVidmdKNWJpYmJodEZQc3Nid1BPcDRIQlZpb2x4dXQ5WjRreGh4bHJtUnN2ME80cEVkcjd0NXhPbVhkWmFpbTU0RUluSVNaa3E3d2dNNTFEdC13IiwiZW1haWwiOiIxNzFsdXVrQGdtYWlsLmNvbSIsIm5hbWUiOiJsdXVrMTcxIiwiaWF0IjoxNjM3NzYyNjY0fQ.hqv-lQD8EgSgRQ9a6gPznmB8dJvVr1471LjVySi77w0"
  );

  return fetch("http://localhost:4001/api/users/me", {
    method: "GET",
    headers: myHeaders,
    // redirect: 'follow'
  })
    .then((response) => [response.status, response.json()])
    .catch((error) => error);
}
