import ICommentRepository from "./iCommentsRepository";
import IUserReposistory from "./iUserRepository";
import ITrackReposistory from "./iTrackRepository";
import IRatingReposistory from "./iRatingRepository";

export default interface Repositories {
  userRepo: IUserReposistory;
  commentRepo: ICommentRepository;
  rateRepo: IRatingReposistory;
  trackRepo: ITrackReposistory;
}
