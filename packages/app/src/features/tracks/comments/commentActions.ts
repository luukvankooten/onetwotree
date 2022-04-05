import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { getAccessToken } from "../../auth/authSlice";
import * as api from "./commentApi";

export const createComment = createAsyncThunk(
  "comment/create",
  async (
    { comment, trackId }: { trackId: string; comment: string },
    thunkApi
  ) => {
    const state = thunkApi.getState() as RootState;

    const token = getAccessToken(state);

    return await api.createComment(trackId, comment, token);
  }
);

export const updateComment = createAsyncThunk(
  "comment/update",
  async ({ id, comment }: { id: string; comment: string }, thunkApi) => {
    const state = thunkApi.getState() as RootState;

    const token = getAccessToken(state);

    return await api.updateComment(id, comment, token);
  }
);

export const removeComment = createAsyncThunk(
  "comment/remove",
  async ({ id }: { id: string }, thunkApi) => {
    const state = thunkApi.getState() as RootState;

    const token = getAccessToken(state);

    return await api.removeComment(id, token);
  }
);
