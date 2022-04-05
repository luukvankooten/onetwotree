import { default as createTrackModel } from "./track";
import { default as createCommentModel } from "./comment";
import { default as createRatingModel } from "./rating";
import { default as createNeo4jModels } from "./user";
import { Connection as MongooseConnection } from "mongoose";
import Neode from "neode";

export type MongooseModels = {
  TrackModel: ReturnType<typeof createTrackModel>;
  CommentModel: ReturnType<typeof createCommentModel>;
  RateModel: ReturnType<typeof createRatingModel>;
};

export type Models = MongooseModels & ReturnType<typeof createNeo4jModels>;

export function buildMongooseModels(
  mongoose: MongooseConnection
): MongooseModels {
  return {
    TrackModel: createTrackModel(mongoose),
    CommentModel: createCommentModel(mongoose),
    RateModel: createRatingModel(mongoose),
  };
}

export default (mongoose: MongooseConnection, neode: Neode): Models => ({
  ...buildMongooseModels(mongoose),
  ...createNeo4jModels(neode),
});
