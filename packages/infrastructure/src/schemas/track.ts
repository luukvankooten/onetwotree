import {
  Schema,
  HydratedDocument,
  Connection as MongooseConnection,
} from "mongoose";
import { Track } from "@12tree/domain";
import { MongoComment } from "./comment";
import { MongoRate } from "./rating";

export type MongoTrack = HydratedDocument<
  Omit<Track, "comments" | "ratings"> & {
    comments: MongoComment[];
    ratings: MongoRate[];
  }
>;

const schema = new Schema<MongoTrack>(
  {
    // id: { type: String, required: true },
    spotifyId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    artists: { type: [String], required: true },
    cover: { type: String },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    ratings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rating",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default (mongooseConnection: MongooseConnection) =>
  mongooseConnection.model<MongoTrack>("Track", schema);
