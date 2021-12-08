import Neode from "neode";

export type UserNeo4j = {
  id: string;
  name: string;
  email: string;
  username: string;
  token_accessToken: string;
  token_refreshToken: string;
  token_expiresIn: number;
  token_createdAt: number;
  friends: UserNeo4j[];
};

export default (neode: Neode) =>
  neode.model<UserNeo4j>("User", {
    id: {
      type: "uuid",
      primary: true,
      required: true,
    },
    name: { type: "string" },
    email: { type: "string", unique: true },
    username: { type: "string", unique: true },
    token_accessToken: "string",
    token_refreshToken: "string",
    token_expiresIn: "number",
    token_createdAt: "number",
    friends: {
      type: "relationships",
      target: "User",
      relationship: "KNOWS",
      direction: "out",
      cascade: "detach",
      eager: true,
    },
  });
