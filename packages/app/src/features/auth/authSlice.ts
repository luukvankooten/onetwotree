import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@12tree/domain";
import { RootState } from "../../app/store";
import { fetchByCredentials, fetchByToken } from "./authApi";
import { Cookies } from "react-cookie";

export enum Status {
  IDLE,
  AUTHENICATED,
  LOADING,
  ERROR,
  UNAUTHORIZEDSTATE,
}

type InitialAuthState = {
  status: Status.IDLE;
};

type AuthorizedState = {
  status: Status.AUTHENICATED;
  user: User;
};
type LoadingState = {
  status: Status.LOADING;
};

type ErrorState = {
  status: Status.ERROR;
  error: string;
};

type UnauthorizedState = {
  status: Status.UNAUTHORIZEDSTATE;
};

export interface AuthState {
  load: State;
}

type State =
  | InitialAuthState
  | AuthorizedState
  | ErrorState
  | LoadingState
  | UnauthorizedState;

const initialState: AuthState = {
  load: {
    status: Status.IDLE,
  },
};

export type AuthMethod =
  | { method: "credentials"; password: string; email: string }
  | { method: "token"; token: string };

export const fetchAuth = createAsyncThunk(
  "auth/authenicate",
  async (auth: AuthMethod) => {
    if (auth.method === "credentials") {
      return await fetchByCredentials({
        password: auth.password,
        email: auth.email,
      });
    }

    return await fetchByToken(auth.token);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAuth.pending, (state, action) => {
        state.load.status = Status.LOADING;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        const [status, payload] = action.payload;

        const load: AuthorizedState | UnauthorizedState =
          status === 200
            ? {
                status: Status.AUTHENICATED,
                user: payload as User,
              }
            : {
                status: Status.UNAUTHORIZEDSTATE,
              };

        state.load = load;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        const load: ErrorState = {
          status: Status.ERROR,
          error: action.error?.message ?? "",
        };

        state.load = load;
      });
  },
});

export const getLoad = (state: RootState) => state.auth.load;
export const getStatus = (state: RootState) => state.auth.load.status;
export const isAuthenicated = (state: RootState) =>
  state.auth.load.status === Status.AUTHENICATED;

export default authSlice.reducer;
