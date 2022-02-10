import { Rate, User } from "@12tree/domain";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getAccessToken } from "../auth/authSlice";
import * as api from "./ratingsApi";

export interface State {
  ratings: Rate[];
}

const initialState: State = {
  ratings: [],
};

const _getIndex = (id: string, state: State) =>
  state.ratings.findIndex((rating) => rating.id === id);

export const createRating = createAsyncThunk(
  "rates/create",
  async ({ trackId, rates }: { trackId: string; rates: number }, thunkApi) => {
    return api.createRate(
      trackId,
      rates,
      getAccessToken(thunkApi.getState() as RootState)
    );
  }
);

export const updateRating = createAsyncThunk(
  "rates/update",
  async ({ id, rates }: { id: string; rates: number }, thunkApi) => {
    return api.updateRate(
      id,
      rates,
      getAccessToken(thunkApi.getState() as RootState)
    );
  }
);

export const removeRating = createAsyncThunk(
  "rates/remove",
  async (id: string, thunkApi) => {
    return api.removeRate(id, getAccessToken(thunkApi.getState() as RootState));
  }
);

export const ratesSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createRating.fulfilled, (state, action) => {
        state.ratings.push(action.payload);
      })
      .addCase(updateRating.fulfilled, (state, action) => {
        const index = _getIndex(action.payload.id, state);

        if (index > -1) {
          state.ratings[index] = action.payload;
        }
      })
      .addCase(removeRating.fulfilled, (state, action) => {
        const index = _getIndex(action.payload.id, state);

        if (index > -1) {
          state.ratings.splice(index, 1);
        }
      });
  },
});

export default ratesSlice.reducer;
