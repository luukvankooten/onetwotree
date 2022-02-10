import { Track } from "@12tree/domain";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { getAccessToken, getUser } from "../auth/authSlice";
import {
  createComment,
  removeComment,
  updateComment,
} from "../comment/commentSlice";
import {
  createRating,
  removeRating,
  updateRating,
} from "../ratings/ratingsSlice";
import * as api from "./tracksApi";

interface TrackState {
  tracks: Track[];
}

const initialState: TrackState = { tracks: [] };

const _getTrackIndex = (id: string, state: TrackState) =>
  state.tracks.findIndex((track) => track.spotifyId === id);

const _getTrack = (id: string, state: TrackState) =>
  state.tracks[_getTrackIndex(id, state)];

const _getTrackIndexByCommentId = (
  id: string,
  state: TrackState
): [number, number] => {
  let commentIndex = -1;

  let trackIndex = state.tracks.findIndex((track) => {
    return (
      track.comments.findIndex((comment, index) => {
        const found = comment.id === id;

        if (found) {
          commentIndex = index;
        }

        return found;
      }) > -1
    );
  });

  return [trackIndex, commentIndex];
};

const _getTrackIndexByRatingId = (
  id: string,
  state: TrackState
): [number, number] => {
  let ratingIndex = -1;

  let trackIndex = state.tracks.findIndex((track) => {
    return (
      track.ratings.findIndex((ratings, index) => {
        const found = ratings.id === id;

        if (found) {
          ratingIndex = index;
        }

        return found;
      }) > -1
    );
  });

  return [trackIndex, ratingIndex];
};

export const fetchTrack = createAsyncThunk(
  "track/get",
  async (id: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const track = _getTrack(id, state.tracks);

    console.log(track);

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
          state.tracks.push(action.payload);
        }
      })
      .addCase(fetchTrack.rejected, (state, action) => {
        console.error(action.payload);
      })
      .addCase(createComment.fulfilled, (state, action) => {
        const id = action.meta.arg.trackId;

        const track = state.tracks.findIndex((track) => track.id === id);

        if (track === -1) {
          return;
        }

        state.tracks[track].comments.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        const [index, commentIndex] = _getTrackIndexByCommentId(
          action.payload.id,
          state
        );

        if (index > -1 && commentIndex > -1) {
          state.tracks[index].comments.splice(commentIndex, 1);
        }
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const [index, commentIndex] = _getTrackIndexByCommentId(
          action.payload.id,
          state
        );

        if (index > -1 && commentIndex > -1) {
          state.tracks[index].comments[commentIndex] = action.payload;
        }
      })
      .addCase(createRating.fulfilled, (state, action) => {
        const id = action.meta.arg.trackId;

        const index = _getTrackIndex(id, state);

        if (index > -1) {
          state.tracks[index].ratings.push(action.payload);
        }
      })
      .addCase(updateRating.fulfilled, (state, action) => {
        const [index, ratingIndex] = _getTrackIndexByRatingId(
          action.payload.id,
          state
        );

        if (index > -1 && ratingIndex > -1) {
          state.tracks[index].ratings[index] = action.payload;
        }
      })
      .addCase(removeRating.fulfilled, (state, action) => {
        const [index, ratingIndex] = _getTrackIndexByRatingId(
          action.payload.id,
          state
        );

        if (index > -1 && ratingIndex > -1) {
          state.tracks[index].ratings.splice(index, 1);
        }
      });
  },
});

export const getTrack = (id: string) => (state: RootState) =>
  _getTrack(id, state.tracks);

export const getUserRate = (id: string) => (state: RootState) =>
  _getTrack(id, state.tracks).ratings.find(
    (rate) => rate.user.id === getUser(state)?.id
  );

export default trackSlice.reducer;
