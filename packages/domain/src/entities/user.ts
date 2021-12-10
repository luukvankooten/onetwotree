import crypto from "crypto";

export interface Token {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  createdAt: number;
}

export default interface User {
  readonly id: string;
  name: string;
  email: string;
  username: string;
  token: Token;
  friends: UserFriend[];
}

export type UserFriend = UserInfo & { accepted: boolean };

export type UserInfo = Omit<User, "token">;

export function isTokenExpired(token: Token): boolean {
  const expiresOn = new Date(token.createdAt);
  expiresOn.setSeconds(expiresOn.getSeconds() + token.expiresIn);

  return Date.now() >= expiresOn.getTime();
}

export async function hash(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(8).toString("hex");

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ":" + derivedKey.toString("hex"));
    });
  });
}

export async function verify(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(":");
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key === derivedKey.toString("hex"));
    });
  });
}
