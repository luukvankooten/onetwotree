import { default as createCommentRepository } from "./src/commentRepository";
import { default as createUserRepository } from "./src/userRepository";
import { default as createTrackRepository } from "./src/trackRepository";
import { default as createRateRepository } from "./src/ratingRepository";

import builder from "./src/schemas";
import { Connection as MongooseConnection } from "mongoose";
import SpotifyWebApi from "spotify-web-api-node";
import Neode from "neode";
import { Repositories } from "@12tree/domain";

export default function (
  mongoose: MongooseConnection,
  spotifyApi: Promise<SpotifyWebApi>,
  neode: Neode
): Repositories {
  const models = builder(mongoose, neode);

  const userRepo = createUserRepository(models);
  const commentRepo = createCommentRepository(models, userRepo);
  const rateRepo = createRateRepository(models, userRepo);
  const trackRepo = createTrackRepository(models, spotifyApi);

  return {
    userRepo,
    commentRepo,
    rateRepo,
    trackRepo,
  };
}
