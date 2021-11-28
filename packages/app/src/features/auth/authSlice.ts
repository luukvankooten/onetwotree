import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@12tree/domain";
import { RootState } from "../../app/store";
import { fetchUser as fetchUserApi } from "./authApi";

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

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (token: string) => {
    const response = await fetchUserApi(
      "QCpzkApjYqrWsp7sow8MXnllR8PyKseUV1vDw0uDJnW5OqQajHAtKdGyNty_L0qczkcHz87FjbV0XFMCHE7aXNuXSnkx9AnnEv6dG6mDir5eLClLNkexFosJRfOgvj9jlgr7Pg2if_umrPktOL4114g6tyAMg"
    );

    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.load.status = Status.LOADING;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
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
      .addCase(fetchUser.rejected, (state, action) => {
        const load: ErrorState = {
          status: Status.ERROR,
          error: action.error?.message ?? "",
        };

        state.load = load;
      });
  },
});

authSlice.caseReducers;

export const getLoad = (state: RootState) => state.auth.load;
export const getState = (state: RootState) => state.auth.load.status;
export const isAuthenicated = (state: RootState) =>
  state.auth.load.status === Status.AUTHENICATED;

export default authSlice.reducer;
