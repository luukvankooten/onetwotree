import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { getAccessToken } from "../../auth/authSlice";
import { getUserRate } from "../tracksSlice";
import * as api from "./ratingApi";

export const obtainRating = createAsyncThunk(
  "rates/obtain",
  async ({ id, rates }: { id: string; rates: number }, thunkApi) => {
    const accessToken = getAccessToken(thunkApi.getState() as RootState);
    const userRating = getUserRate(id)(thunkApi.getState() as RootState);

    if (userRating && rates > 0) {
      return api.updateRate(userRating.id, rates, accessToken);
    }

    if (userRating && rates === 0) {
      return api.removeRate(userRating.id, accessToken);
    }

    return api.createRate(id, rates, accessToken);
  }
);
