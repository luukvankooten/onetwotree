import { Comment, User } from "@12tree/domain";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

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

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.comments.push(action.payload);
    },
    edit: (state, action: PayloadAction<UpdateComment>) => {
      state.comments[action.payload.index].comment = action.payload.comment;
    },
    remove: (state, action: PayloadAction<number>) => {
      state.comments.splice(action.payload, 1);
    },
  },
});

export const { add, edit, remove } = commentSlice.actions;

export const selectComments = (state: RootState) => state.comment.comments;
export const selectComment = (index: number) => (state: RootState) =>
  state.comment.comments[index];

export default commentSlice.reducer;
