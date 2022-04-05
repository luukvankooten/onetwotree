import {
  Comment,
  ICommentRepository,
  IUserReposistory,
  NotFoundError,
} from "@12tree/domain";
import { Types } from "mongoose";
import { mapPropsToComment } from "./mappers";
import { MongooseModels } from "./schemas";
import comment from "./schemas/comment";

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
    const persitedComment = await mapPropsToComment(savedComment, user);

    await userRepo.addUserComment(persitedComment);

    return persitedComment;
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

  async function getByIds(ids: string[]) {
    const comments = await CommentModel.find({
      _id: {
        $in: ids.map((id) => new Types.ObjectId(id)),
      },
    });

    let resolvedComments = await Promise.all(
      comments.map(async (comment) => {
        const user = await userRepo.get(comment.user_id);

        return mapPropsToComment(comment, user);
      })
    );

    return resolvedComments;
  }

  return {
    create,
    get,
    update,
    delete: remove,
    getByIds,
  };
}
