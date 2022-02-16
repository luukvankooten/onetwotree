import { Action, AnyAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: Error | null = null;

function isRejectedAction(action: AnyAction) {
  return action.type.endsWith("rejected");
}

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(isRejectedAction, (state, action) => {
      console.log(action);
      return action.error;
    });
  },
});

export const hasError = (state: RootState) => state.error != null;

export const getError = (state: RootState): Error | null => state.error;

export default errorSlice.reducer;
