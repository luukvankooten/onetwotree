import { Rate } from "@12tree/domain";
import apiFetch from "../../utils/apiFetch";

export async function createRate(
  trackId: string,
  rateing: number,
  token: string
) {
  return apiFetch<Rate>(token, `tracks/rates/${trackId}`, {
    body: JSON.stringify({ rateing }),
    method: "POST",
  });
}

export async function removeRate(id: string, token: string) {
  return apiFetch<Rate>(token, `rates/${id}`, { method: "DELETE" });
}

export async function updateRate(id: string, rateing: number, token: string) {
  return apiFetch<Rate>(token, `rates/${id}`, {
    body: JSON.stringify({ rateing }),
    method: "PUT",
  });
}
