import {
  IUserReposistory,
  NotFoundError,
  User,
  Comment,
  ICommentRepository,
} from "@12tree/domain";
import {
  mapUserToProps,
  mapPropsToUserWithToken,
  mapPropsToUser,
} from "./mappers";
import createUserModel, { UserNeo4j } from "./schemas/user";
import { Node, Relationship } from "neode";
import { UserFriend } from "@12tree/domain/src/entities/user";
import crypto from "crypto";

type IUserReposistoryDependencies = ReturnType<typeof createUserModel>;

export default function ({
  UserModel,
  UserCommentModel,
}: IUserReposistoryDependencies): IUserReposistory {
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

    console.log(await get(user.id));

    return mapPropsToUserWithToken(updated.properties());
  }

  async function remove(id: string) {
    const user = await (await UserModel.find(id)).delete();

    return mapPropsToUserWithToken(user.properties());
  }

  async function follow(userId: string, toFollowId: string) {
    const user = await UserModel.find(userId);
    const toFollow = await UserModel.find(toFollowId);

    if (!user || !toFollow) {
      throw new NotFoundError();
    }

    const relation = await toFollow.relateTo(user, "followers", {
      accepted: false,
    });

    return mapPropsToUser(relation.startNode().properties());
  }

  async function accept(userId: string, toFollowId: string) {
    const user = await UserModel.find(userId);

    if (!user) {
      throw new NotFoundError();
    }

    const requester: Relationship | undefined = user
      .get<Relationship[]>("followers")
      .find(
        (req) =>
          req.get("accepted", false) === false &&
          req.endNode().properties().id === toFollowId
      );

    if (!requester) {
      throw new NotFoundError();
    }

    //@ts-ignore
    const accept = await requester.update({ accepted: true });

    return mapPropsToUser(accept.endNode().properties());
  }

  async function unfollow(userId: string, toUnfollowId: string) {
    const user = await UserModel.find(toUnfollowId);

    if (!user) {
      throw new NotFoundError();
    }

    const requester: Relationship | undefined = user
      .get<Relationship[]>("followers")
      .find(
        (req) =>
          req.get("accepted") === true && req.endNode().get("id") === userId
      );

    if (!requester) {
      throw new NotFoundError();
    }

    //@ts-ignore
    const removed = await requester.delete();

    return mapPropsToUser(removed.startNode().properties());
  }

  async function getFollowers(id: string): Promise<UserFriend[]> {
    const user = await UserModel.find(id);

    if (!user) {
      throw new NotFoundError();
    }

    const followers: UserFriend[] = user
      .get<Relationship[]>("followers")
      .map((rel) => ({
        accepted: rel.get("accepted", false),
        ...mapPropsToUser(rel.endNode().properties()),
      }));

    return followers;
  }

  async function getUserCommentsIds(userId: string) {
    const user = await UserModel.find(userId);

    if (!user) {
      throw new NotFoundError();
    }

    const comments = user
      .get<Relationship[]>("comments")
      .map((req) => req.endNode().get<string>("comment_id"));

    return comments;
  }

  async function addUserComment(comment: Comment) {
    const user = await UserModel.find(comment.user.id);

    if (!user) {
      throw new NotFoundError();
    }

    const createComment = await UserCommentModel.create({
      id: crypto.randomUUID(),
      comment_id: comment.id,
    });

    await user.relateTo(createComment, "comments");

    return comment;
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
    getFollowers,
    unfollow,
    accept,
    follow,
    getUserCommentsIds,
    addUserComment,
  };
}
