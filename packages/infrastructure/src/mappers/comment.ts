import { MongoComment } from "../schemas/comment";
import { Comment, UserInfo } from "@12tree/domain";
import userRepo from "../userRepository";

export async function mapPropsToComment(
  comment: MongoComment,
  user: UserInfo
): Promise<Comment> {
  return {
    id: comment.id as string,
    comment: comment.comment,
    user: user,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };
}

// export function mapCommentToProps(comment: Comment): MongoComment {
//   return {
//     _id: comment.id,
//     comment: comment.comment,
//     user_id: comment.user.id,
//     createdAt: comment.createdAt,
//     updatedAt: comment.updatedAt
//   }
// }
