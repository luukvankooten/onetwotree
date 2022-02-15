export {
  default as User,
  isTokenExpired,
  hash,
  verify,
  Token,
  UserInfo,
  UserFriend,
} from "./src/entities/user";

export { default as Rate } from "./src/entities/rating";
export {
  default as Track,
  SearchTrack,
  getOveralRateing,
} from "./src/entities/track";
export { default as Comment } from "./src/entities/comment";
export { default as ICommentRepository } from "./src/repositories/iCommentsRepository";
export { default as IUserReposistory } from "./src/repositories/iUserRepository";
export { default as ITrackReposistory } from "./src/repositories/iTrackRepository";
export { default as IRatingReposistory } from "./src/repositories/iRatingRepository";

import _ICommentRepository from "./src/repositories/iCommentsRepository";
import _IUserReposistory from "./src/repositories/iUserRepository";
import _ITrackReposistory from "./src/repositories/iTrackRepository";
import _IRatingReposistory from "./src/repositories/iRatingRepository";

export interface Repositories {
  userRepo: _IUserReposistory;
  commentRepo: _ICommentRepository;
  rateRepo: _IRatingReposistory;
  trackRepo: _ITrackReposistory;
}

export class Unauthorized extends Error {
  constructor(message?: string) {
    super(message ?? "Not authorized");
    this.name = "Unauthorized";
  }
}

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? "Not Found");
    this.name = "NotFoundError";
  }
}
