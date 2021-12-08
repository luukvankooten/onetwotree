import { UserInfo, User } from "@12tree/domain";
import { UserNeo4j } from "../schemas/user";

// export function mapPropsToUser(props: UserNeo4j, includeToken: boolean): User;
export function mapPropsToUser(props: UserNeo4j): UserInfo {
  return {
    id: props.id,
    name: props.name,
    username: props.username,
    email: props.email,
    friends: [],
  };
}

export function mapPropsToUserWithToken(props: UserNeo4j): User {
  return {
    ...mapPropsToUser(props),
    token: {
      accessToken: props.token_accessToken,
      refreshToken: props.token_refreshToken,
      expiresIn: props.token_expiresIn,
      createdAt: props.token_createdAt,
    },
  };
}

export function mapUserToProps(user: User): UserNeo4j {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    token_accessToken: user.token.accessToken,
    token_refreshToken: user.token.refreshToken,
    token_expiresIn: user.token.expiresIn,
    token_createdAt: user.token.createdAt,
    friends: [],
  };
}
