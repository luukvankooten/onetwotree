import { isTokenExpired } from "../entities/user";

describe("Token test", () => {
  it("should be expired", () => {
    const createdAt = new Date();
    createdAt.setHours(createdAt.getHours() - 2);

    const token = {
      accessToken: "",
      refreshToken: "",
      expiresIn: 3600,
      createdAt: createdAt.getTime(),
    };

    expect(isTokenExpired(token)).toBeTruthy();
  });

  it("should not be expired", () => {
    const createdAt = new Date();

    const token = {
      accessToken: "",
      refreshToken: "",
      expiresIn: 3600,
      createdAt: createdAt.getTime(),
    };

    expect(isTokenExpired(token)).toBeFalsy();
  });
});
