import { Rate } from "@12tree/domain";
import apiFetch from "../../../utils/apiFetch";

export async function createRate(
  trackId: string,
  rating: number,
  token: string
) {
  return apiFetch<Rate>(token, `tracks/${trackId}/rate`, {
    body: JSON.stringify({ rating }),
    method: "POST",
  });
}

export async function removeRate(id: string, token: string) {
  return apiFetch<Rate>(token, `rates/${id}`, { method: "DELETE" });
}

export async function updateRate(id: string, rating: number, token: string) {
  return apiFetch<Rate>(token, `rates/${id}`, {
    body: JSON.stringify({ rating }),
    method: "PUT",
  });
}
