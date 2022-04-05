import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import searchReducer from "../features/search/searchSlice";
import trackReducer from "../features/tracks/tracksSlice";
import errorReducer from "../features/error/errorSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authReducer,
    tracks: trackReducer,
    error: errorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
