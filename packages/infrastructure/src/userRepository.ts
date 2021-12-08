import { IUserReposistory, NotFoundError, User } from "@12tree/domain";
import {
  mapUserToProps,
  mapPropsToUserWithToken,
  mapPropsToUser,
} from "./mappers";
import { Models } from "./schemas";

export default function ({ UserModel }: Models): IUserReposistory {
  async function findBy(field: string, argument: string) {
    const query = await UserModel.query()
      .match("u", UserModel)
      .where(field, argument)
      .limit(1)
      .return("u")
      .execute();

    const user = query.records.shift()?.get("u")?.properties;

    if (!user) {
      throw new NotFoundError("User does not exist");
    }

    return mapPropsToUserWithToken(user);
  }

  async function create(user: Omit<User, "friends">): Promise<User> {
    const userCreated = await UserModel.create(
      mapUserToProps({ ...user, friends: [] })
    );

    return mapPropsToUserWithToken(userCreated.properties());
  }

  async function getByEmail(email: string) {
    return await findBy("u.email", email);
  }

  async function getByToken(token: string) {
    return await findBy("u.token_accessToken", token);
  }

  async function getWithToken(id: string) {
    const user = await UserModel.find(id);

    console.log(user);

    if (!user) {
      throw new NotFoundError(`User with ${id} doesn't exist`);
    }

    return mapPropsToUserWithToken(user.properties());
  }

  async function get(id: string) {
    const user = await UserModel.find(id);

    if (!user) {
      throw new NotFoundError(`User with ${id} doesn't exist`);
    }

    return mapPropsToUser(user.properties());
  }

  async function getByRefreshToken(token: string) {
    return await findBy("u.token_refreshToken", token);
  }

  async function update(user: User) {
    const existingUser = await UserModel.find(user.id);

    const updated = await existingUser.update(mapUserToProps(user));

    return mapPropsToUserWithToken(updated.properties());
  }

  async function remove(id: string) {
    const user = await (await UserModel.find(id)).delete();

    return mapPropsToUserWithToken(user.properties());
  }

  return {
    create,
    getByToken,
    get,
    getWithToken,
    getByRefreshToken,
    getByEmail,
    delete: remove,
    update,
  };
}
