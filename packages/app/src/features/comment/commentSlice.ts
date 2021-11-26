import { Comment, User } from "@12tree/domain";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface commentState {
  comments: Comment[];
}

const user1: User = {
  username: "Luuk",
  email: "l.vankooten@student.avans.nl",
  name: "Luuk van Kooten",
  token: "",
};

const user2: User = {
  username: "Pascal",
  email: "p.stoop@student.avans.nl",
  name: "Pascal Stoop",
  token: "",
};

const user3: User = {
  username: "Ali",
  email: "a.bikini@student.avans.nl",
  name: "Ali Bikini",
  token: "",
};

const initialState: commentState = {
  comments: [
    {
      user: user3,
      comment: "Super track",
      created: Date.now(),
    },
    {
      user: user1,
      comment: "Leuk",
      created: Date.now(),
    },
    {
      user: user1,
      comment: "Topp",
      created: Date.now(),
    },
    {
      user: user2,
      comment: "Deze artiets is goed",
      created: Date.now(),
    },
    {
      user: user2,
      comment: "Niet normaal",
      created: Date.now(),
    },
  ],
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

export default commentSlice.reducer;
