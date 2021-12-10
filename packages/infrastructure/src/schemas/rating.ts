import {
  Schema,
  HydratedDocument,
  Connection as MongooseConnection,
} from "mongoose";
import { Rate } from "@12tree/domain";

export type MongoRate = HydratedDocument<
  Omit<Rate, "user"> & { user_id: string }
>;

export const schema = new Schema<MongoRate>(
  {
    rating: { type: Number, required: true },
    user_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default (mongooseConnection: MongooseConnection) =>
  mongooseConnection.model<MongoRate>("Rating", schema);
