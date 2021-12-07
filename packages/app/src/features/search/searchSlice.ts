import { SearchTrack } from "@12tree/domain/src/entities/track";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { AppThunk, RootState, store } from "../../app/store";
import { getAccessToken } from "../auth/authSlice";
import { searchTrackApi } from "./searchApi";

export type SearchState = {
  items: SearchTrack[];
  status: "idle" | "loading" | "error";
};

const initialState: SearchState = { items: [], status: "idle" };

export const searchTrack = createAsyncThunk(
  "search/track",
  async (query: string, thunkApi) => {
    const accessToken = getAccessToken(thunkApi.getState() as RootState);

    if (!accessToken) {
      return [];
    }

    return await searchTrackApi(query, accessToken);
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchTrack.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchTrack.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "idle";
      })
      .addCase(searchTrack.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const searchedTracks = (state: RootState) => state.search;

export default searchSlice.reducer;
