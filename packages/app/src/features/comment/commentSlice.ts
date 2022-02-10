import { Comment, User } from "@12tree/domain";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getAccessToken } from "../auth/authSlice";
import * as api from "./commentApi";

export interface commentState {
  comments: Comment[];
}

const initialState: commentState = {
  comments: [],
};

type UpdateComment = {
  index: number;
  comment: string;
};

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

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {},
    edit: (state, action: PayloadAction<UpdateComment>) => {
      // state.comments[action.payload.index] = { state: "idle", comment: action.payload.comment }
    },
    remove: (state, action: PayloadAction<number>) => {
      // state.comments.splice(action.payload, 1);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          (comment) => comment.id === action.payload.id
        );

        if (index > -1) {
          state.comments.splice(index, 1);
        }
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          (comment) => action.payload.id === comment.id
        );

        if (index > -1) {
          state.comments[index] = action.payload;
        }
      });
  },
});

export const { add, edit, remove } = commentSlice.actions;

export const selectComments = (state: RootState) => state.comment.comments;
export const selectComment = (index: number) => (state: RootState) =>
  state.comment.comments[index];

export default commentSlice.reducer;
