import { Schema, model, Document, Types } from "mongoose";
import { Comment } from "@12tree/domain";
import { ICommentRepository } from "@12tree/domain";
import conn from "./connectionUtil";

export type IComment = Omit<Comment, "user">;

export const schema = new Schema<IComment>(
  {
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const commentModel = conn.model<IComment>("Comment", schema);

async function get(id: string) {
  if (!Types.ObjectId.isValid(id)) {
    return;
  }

  let comment = await commentModel.findById(id);

  if (!comment) {
    return;
  }

  return comment;
}

async function getAll() {
  let comment = await commentModel.find();

  return comment;
}

async function remove(id: string) {
  if (!Types.ObjectId.isValid(id)) {
    return false;
  }

  let deleted = await commentModel.findByIdAndDelete(id);

  console.log(deleted);

  return true;
}

async function update(id: string, comment: Partial<Omit<Comment, "user">>) {
  if (!Types.ObjectId.isValid(id)) {
    return;
  }

  let updatedComment = await commentModel.findByIdAndUpdate(id, comment);

  if (!updatedComment) {
    return;
  }

  return updatedComment;
}

const commentRepo: ICommentRepository = {
  get,
  getAll,
  delete: remove,
  update,
};

export default commentRepo;
