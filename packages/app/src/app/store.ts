import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import commentReducer from "../features/comment/commentSlice";
import searchReducer from "../features/search/searchSlice";
import trackReducer from "../features/tracks/tracksSlice";
import ratesReducer from "../features/ratings/ratingsSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    comment: commentReducer,
    auth: authReducer,
    tracks: trackReducer,
    rateings: ratesReducer,
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
