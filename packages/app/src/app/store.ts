import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import commentReducer from "../features/comment/commentSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    comment: commentReducer,
    auth: authReducer,
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
