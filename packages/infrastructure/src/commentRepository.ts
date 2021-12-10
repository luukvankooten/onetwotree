import {
  Comment,
  ICommentRepository,
  IUserReposistory,
  NotFoundError,
} from "@12tree/domain";
import { Types } from "mongoose";
import { mapPropsToComment } from "./mappers";
import { MongooseModels } from "./schemas";

export default function (
  { TrackModel, CommentModel }: MongooseModels,
  userRepo: IUserReposistory
): ICommentRepository {
  async function create(
    trackId: string,
    comment: Omit<Comment, "id" | "createdAt">
  ) {
    const track = await TrackModel.findById(trackId);

    if (!track) {
      throw new NotFoundError(`Track not found with id: ${trackId}`);
    }

    const doc = new CommentModel({
      user_id: comment.user.id,
      comment: comment.comment,
    });

    const savedComment = await doc.save();

    let index = track.comments.push(savedComment._id);
    const savedTrack = await track.save();
    const user = await userRepo.get(comment.user.id);

    return mapPropsToComment(savedComment, user);
  }

  async function get(id: string) {
    const comment = await CommentModel.findById(id);

    if (!comment) {
      throw new NotFoundError(`Comment with id: ${id} not found`);
    }

    return mapPropsToComment(comment, await userRepo.get(comment.user_id));
  }

  async function remove(id: string) {
    const comment = await CommentModel.findByIdAndRemove(id);

    if (!comment) {
      throw new NotFoundError(`Comment with id ${id} not found`);
    }

    await comment.save();

    return mapPropsToComment(comment, await userRepo.get(comment.user_id));
  }

  async function update(
    id: string,
    comment: Omit<Comment, "id" | "createdAt">
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundError("Id is not valid");
    }

    let updatedComment = await CommentModel.findByIdAndUpdate(
      id,
      {
        comment: comment.comment,
      },
      { new: true }
    );

    if (!updatedComment) {
      throw new NotFoundError(`Comment with id: ${id} not found`);
    }

    return mapPropsToComment(updatedComment, comment.user);
  }

  return {
    create,
    get,
    update,
    delete: remove,
  };
}
