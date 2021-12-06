import { ICommentRepository, IUserReposistory } from "@12tree/domain";
import { commentRepository, userRepository } from "@12tree/infrastructure";

export const commentRepo: ICommentRepository = commentRepository;
export const userRepo: IUserReposistory = userRepository;
