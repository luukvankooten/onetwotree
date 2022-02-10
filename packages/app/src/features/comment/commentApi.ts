import apiFetch from "../../utils/apiFetch";
import { Comment } from "@12tree/domain";
import { access } from "fs";

export async function createComment(
  trackId: string,
  comment: string,
  accessToken: string
) {
  return apiFetch<Comment>(accessToken, `tracks/${trackId}/comment`, {
    body: JSON.stringify({ comment }),
    method: "POST",
  });
}

export async function removeComment(id: string, accessToken: string) {
  console.log(id);
  return apiFetch<Comment>(accessToken, `comments/${id}`, { method: "DELETE" });
}

export async function updateComment(
  id: string,
  comment: string,
  accessToken: string
) {
  return apiFetch<Comment>(accessToken, `comments/${id}`, {
    body: JSON.stringify({ comment }),
    method: "PUT",
  });
}
