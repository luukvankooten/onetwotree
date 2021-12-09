import { Track } from "@12tree/domain";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { getAccessToken } from "../auth/authSlice";
import * as api from "./tracksApi";

interface TrackState {
  tracks: Track[];
}

const initialState: TrackState = { tracks: [] };

const _getTrack = (id: string, state: TrackState) =>
  state.tracks.find((track) => track.id === id);

export const fetchTrack = createAsyncThunk(
  "track/get",
  async (id: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const track = _getTrack(id, state.tracks);

    if (track) {
      return track;
    }

    return await api.fetchTrack(id, getAccessToken(state));
  }
);

export const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTrack.fulfilled, (state, action) => {
        if (!_getTrack(action.payload.id, state)) {
          state.tracks = [...state.tracks, action.payload];
        }
      })
      .addCase(fetchTrack.rejected, (state, action) => {
        console.error(action.payload);
      });
  },
});

export const getTrack = (id: string) => (state: RootState) =>
  _getTrack(id, state.tracks);

export default trackSlice.reducer;
