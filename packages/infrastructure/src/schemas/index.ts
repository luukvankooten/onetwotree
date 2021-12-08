import { default as createTrackModel } from "./track";
import { default as createCommentModel } from "./comment";
import { default as createRatingModel } from "./rating";
import { default as createUserModel } from "./user";
import { Connection as MongooseConnection } from "mongoose";
import Neode from "neode";

export interface Models {
  TrackModel: ReturnType<typeof createTrackModel>;
  CommentModel: ReturnType<typeof createCommentModel>;
  RateModel: ReturnType<typeof createRatingModel>;
  UserModel: ReturnType<typeof createUserModel>;
}

export default (mongoose: MongooseConnection, neode: Neode): Models => ({
  TrackModel: createTrackModel(mongoose),
  CommentModel: createCommentModel(mongoose),
  RateModel: createRatingModel(mongoose),
  UserModel: createUserModel(neode),
});
