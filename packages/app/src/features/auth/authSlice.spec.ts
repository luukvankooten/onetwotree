import { User } from "@12tree/domain";
import authSlice, { AuthState, fetchUser, Status } from "./authSlice";
import { AnyAction } from "@reduxjs/toolkit";

describe("auth reducer", () => {
  it("should return  handle HTTP 200 status if promise is fulfilled", () => {
    const fakeUser: User = {
      username: "foo",
      email: "foo@foo.com",
      token: "",
      name: "foo baz",
    };

    const action = {
      type: fetchUser.fulfilled.type,
      payload: [200, fakeUser],
    };

    expect(authSlice(undefined, action)).toEqual({
      load: { status: Status.AUTHENICATED, user: fakeUser },
    });
  });

  it("should return unaurhized status on HTTP 402 status if promise is fulfilled", () => {
    const action = {
      type: fetchUser.fulfilled.type,
      payload: [401, "Unauthenicated"],
    };

    expect(authSlice(undefined, action)).toEqual({
      load: { status: Status.UNAUTHORIZEDSTATE },
    });
  });

  it("should return error status if promise is rejected", () => {
    const action = {
      type: fetchUser.rejected.type,
      payload: "",
    };

    expect(authSlice(undefined, action)).toEqual({
      load: { status: Status.ERROR, error: "" },
    });
  });

  it("should return load status if promise is pending", () => {
    const action = {
      type: fetchUser.pending.type,
    };

    expect(authSlice(undefined, action)).toEqual({
      load: { status: Status.LOADING },
    });
  });
});
