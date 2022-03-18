import { Track } from "@12tree/domain";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getAccessToken, getUser } from "../auth/authSlice";
import {
  createComment,
  removeComment,
  updateComment,
} from "./comments/commentActions";
import { obtainRating } from "./ratings/RatingActions";
import * as trackApi from "./tracksApi";

interface TrackState {
  tracks: Track[];
}

const initialState: TrackState = { tracks: [] };

const _getTrackIndex = (id: string, state: TrackState) =>
  state.tracks.findIndex((track) => track.id === id);

const _getTrack = (id: string, state: TrackState) =>
  state.tracks[_getTrackIndex(id, state)];

const _getTrackIndexByCommentId = (
  id: string,
  state: TrackState
): [number, number] => {
  let trackIndex = -1;
  let commentIndex = -1;

  for (const track of state.tracks) {
    for (const comment of track.comments) {
      if (comment.id === id) {
        trackIndex = state.tracks.indexOf(track);
        commentIndex = state.tracks[trackIndex].comments.indexOf(comment);
        break;
      }
    }
  }

  return [trackIndex, commentIndex];
};

export const fetchTrackBySpotifyId = createAsyncThunk(
  "track/getTrackBySpotifyId",
  async (id: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const track = _getTrack(id, state.tracks);

    console.log(track);

    if (track) {
      return track;
    }

    return await trackApi.fetchTrackBySpotifyId(id, getAccessToken(state));
  }
);

export const fetchTrack = createAsyncThunk(
  "track/get",
  async (id: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const track = _getTrack(id, state.tracks);

    console.log(track);

    if (track) {
      return track;
    }

    return await trackApi.fetchTrack(id, getAccessToken(state));
  }
);

export const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTrackBySpotifyId.fulfilled, (state, action) => {
        if (!_getTrack(action.payload.id, state)) {
          state.tracks.push(action.payload);
        }
      })
      .addCase(fetchTrack.fulfilled, (state, action) => {
        if (!_getTrack(action.payload.id, state)) {
          state.tracks.push(action.payload);
        }
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

        console.log(index, commentIndex, action);

        if (index > -1 && commentIndex > -1) {
          state.tracks[index].comments[commentIndex] = action.payload;
        }
      })
      .addCase(obtainRating.fulfilled, (state, action) => {
        const track = _getTrack(action.meta.arg.id, state);

        if (!track) {
          return;
        }

        const index = track.ratings.findIndex(
          (rating) => rating.id === action.payload.id
        );

        track.ratings[index !== -1 ? index : track.ratings.length] =
          action.payload;
      });
  },
});

export const getTrackBySpotifyId = (spotifyId: string) => (state: RootState) =>
  state.tracks.tracks.find((track) => track.spotifyId === spotifyId);

export const getTrack = (id: string) => (state: RootState) =>
  _getTrack(id, state.tracks);

export const getUserRate = (id: string) => (state: RootState) =>
  _getTrack(id, state.tracks)?.ratings.find(
    (rate) => rate.user.id === getUser(state)?.id
  );

export const getRatings = (id: string) => (state: RootState) =>
  _getTrack(id, state.tracks)?.ratings;

export const getUserInvoledTracks = (userId: string) => (state: RootState) =>
  state.tracks.tracks.filter(
    (track) =>
      track.comments.filter((comment) => comment.user.id === userId).length >
        0 ||
      track.ratings.filter((rating) => rating.user.id === userId).length > 0
  );

export const getUserComments = (userId: string) => (state: RootState) =>
  getUserInvoledTracks(userId)(state)
    .flatMap((track) => track.comments)
    .filter((comment) => comment.user.id === userId);

export const getUserRatings = (userId: string) => (state: RootState) =>
  getUserInvoledTracks(userId)(state)
    .flatMap((track) => track.ratings)
    .filter((rating) => rating.user.id === userId);

export default trackSlice.reducer;
