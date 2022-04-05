import { Comment, Rating, User } from "@12tree/domain";
import ApiFetch from "../../utils/apiFetch";

export async function getUserById(id: string, token: string) {
  return ApiFetch<User>(token, `/users/${id}`);
}

export async function updateUser(user: User, token: string) {
  return ApiFetch<User>(token, `/users/${user.id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });
}

export async function getCommentsById(id: string, token: string) {
  return ApiFetch<Comment[]>(token, `/users/${id}`);
}

export async function getRatingsById(id: string, token: string) {
  return ApiFetch<Rating[]>(token, `/users/${id}`);
}
