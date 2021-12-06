import Neode from "neode";
import { IUserReposistory, User } from "@12tree/domain";

//ski-cipher-float-violin-emotion-9685
const instance = new Neode("bolt://localhost:7687", "", "");

type UserNeo4j = {
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

const userModel = instance.model<UserNeo4j>("User", {
  id: {
    type: "uuid",
    primary: true,
  },
  name: "string",
  email: "string",
  username: "string",
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

function mapPropsToUser(props: UserNeo4j): User {
  return {
    id: props.id,
    name: props.name,
    username: props.username,
    email: props.email,
    token: {
      accessToken: props.token_accessToken,
      refreshToken: props.token_refreshToken,
      expiresIn: props.token_expiresIn,
      createdAt: props.token_createdAt,
    },
    friends: [],
  };
}

async function findBy(field: string, argument: string) {
  const query = await userModel
    .query()
    .match("u", userModel)
    .where(field, argument)
    .limit(1)
    .return("u")
    .execute();

  const user = query.records.shift()?.get("u")?.properties;

  if (!user) {
    return undefined;
  }

  return mapPropsToUser(user);
}

async function create({
  id,
  name,
  username,
  email,
  token,
}: Omit<User, "friends">): Promise<User | undefined> {
  const user = await instance.create<UserNeo4j>("User", {
    id,
    name,
    username,
    email,
    token_accessToken: token.accessToken,
    token_refreshToken: token.refreshToken,
    token_expiresIn: token.expiresIn,
    token_createdAt: token.createdAt,
  });

  return mapPropsToUser(user.properties());
}

async function getByToken(token: string) {
  return await findBy("u.token_accessToken", token);
}

async function get(id: string) {
  const user = await userModel.find(id);

  if (!user) {
    return;
  }

  return mapPropsToUser(user.properties());
}

async function getByRefreshToken(token: string) {
  return await findBy("u.token_refreshToken", token);
}

const userRepository: IUserReposistory = {
  create,
  getByToken,
  get,
  getByRefreshToken,
};

export default userRepository;
