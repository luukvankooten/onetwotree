import {
  Schema,
  HydratedDocument,
  Connection as MongooseConnection,
} from "mongoose";
import { Comment } from "@12tree/domain";

export type MongoComment = HydratedDocument<
  Omit<Comment, "user"> & { user_id: string }
>;

export const schema = new Schema<MongoComment>(
  {
    user_id: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default (mongooseConnection: MongooseConnection) =>
  mongooseConnection.model<MongoComment>("Comment", schema);
