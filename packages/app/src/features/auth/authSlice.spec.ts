import { User } from "@12tree/domain";
import authSlice, { AuthState, fetchAuth, Status } from "./authSlice";
import { AnyAction } from "@reduxjs/toolkit";

describe("auth reducer", () => {
  it("should return  handle HTTP 200 status if promise is fulfilled", () => {
    const fakeUser: User = {
      id: "",
      username: "foo",
      email: "foo@foo.com",
      token: {
        refreshToken: "",
        accessToken: "",
        expiresIn: 0,
        createdAt: 0,
      },
      name: "foo baz",
      friends: [],
    };

    const action = {
      type: fetchAuth.fulfilled.type,
      payload: [200, fakeUser],
    };

    expect(authSlice(undefined, action)).toEqual({
      load: { status: Status.AUTHENICATED, user: fakeUser },
    });
  });

  it("should return unaurhized status on HTTP 402 status if promise is fulfilled", () => {
    const action = {
      type: fetchAuth.fulfilled.type,
      payload: [401, "Unauthenicated"],
    };

    expect(authSlice(undefined, action)).toEqual({
      load: { status: Status.UNAUTHORIZEDSTATE },
    });
  });

  it("should return error status if promise is rejected", () => {
    const action = {
      type: fetchAuth.rejected.type,
      payload: "",
    };

    expect(authSlice(undefined, action)).toEqual({
      load: { status: Status.ERROR, error: "" },
    });
  });

  it("should return load status if promise is pending", () => {
    const action = {
      type: fetchAuth.pending.type,
    };

    expect(authSlice(undefined, action)).toEqual({
      load: { status: Status.LOADING },
    });
  });
});
