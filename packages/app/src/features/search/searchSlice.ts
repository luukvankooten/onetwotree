import { SearchTrack } from "@12tree/domain/src/entities/track";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
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

export const searchTracksByQuery = (query: string) => (state: RootState) => {
  const normalizedQuery = query.toLowerCase().split(" ");

  return state.search.items.filter((item) => {
    const name = item.name.toLowerCase();

    return (
      normalizedQuery.filter((q) => {
        const hasTrackName = name.includes(q);
        const hasArtists =
          item.artists.filter((name) => name.toLowerCase().includes(q)).length >
          0;

        return hasTrackName || hasArtists;
      }).length > 0
    );
  });
};

export default searchSlice.reducer;
