import { Comment, Rating, User } from "@12tree/domain";
import ApiFetch from "../../utils/apiFetch";

export async function getUserById(id: string, token: string) {
  return ApiFetch<User>(token, `/users/${id}`);
}

export async function getCommentsById(id: string, token: string) {
  return ApiFetch<Comment[]>(token, `/users/${id}`);
}

export async function getRatingsById(id: string, token: string) {
  return ApiFetch<Rating[]>(token, `/users/${id}`);
}
