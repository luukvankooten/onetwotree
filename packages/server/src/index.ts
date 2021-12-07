import {
  ICommentRepository,
  ITrackReposistory,
  IUserReposistory,
} from "@12tree/domain";
import {
  commentRepository,
  trackRepository,
  userRepository,
} from "@12tree/infrastructure";

export const commentRepo: ICommentRepository = commentRepository;
export const userRepo: IUserReposistory = userRepository;
export const trackRepo: ITrackReposistory = trackRepository;
