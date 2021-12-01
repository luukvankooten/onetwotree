import { ICommentRepository } from "@12tree/domain";
import commentRepository from "@12tree/infrastructure/src/comment";

export const commentRepo: ICommentRepository = commentRepository;
