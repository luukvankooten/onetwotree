import express, { Router } from "express";
import asyncHandler from "express-async-handler";
import {
  ICommentRepository,
  IRatingReposistory,
  ITrackReposistory,
  UserInfo,
} from "@12tree/domain";
import { commentValidator, rateValidator } from "@12tree/validation";

interface TracksDependencies {
  trackRepo: ITrackReposistory;
  rateRepo: IRatingReposistory;
  commentRepo: ICommentRepository;
}

export default function ({
  trackRepo,
  rateRepo,
  commentRepo,
}: TracksDependencies): Router {
  const router = express.Router();

  router.get(
    "/search",
    asyncHandler(async (req, res) => {
      const query = req.query.q?.toString();

      const search = await trackRepo.search(query ?? "");

      res.json(search);
    })
  );

  router.get(
    "/:id",
    asyncHandler(async (req, res) => {
      const track = await trackRepo.get(req.params.id.toString());

      res.json(track);
    })
  );

  router.get(
    "/spotify/:id",
    asyncHandler(async (req, res) => {
      const track = await trackRepo.findBySpotifyId(req.params.id.toString());

      res.json(track);
    })
  );

  router.post(
    "/:id",
    asyncHandler(async (req, res) => {
      res.json(await trackRepo.findBySpotifyId(req.params.id.toString()));
    })
  );

  router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
      const track = await trackRepo.delete(req.params.id.toString());

      res.json(track);
    })
  );

  router.post(
    "/:id/comment",
    asyncHandler(async (req, res) => {
      const trackId = req.params.id.toString();
      const validate = await commentValidator.validate(req.body);

      const comment = {
        comment: validate.comment,
        user: req.user as UserInfo,
      };

      res.json(await commentRepo.create(trackId, comment));
    })
  );

  router.post(
    "/:id/rate",
    asyncHandler(async (req, res) => {
      const trackId = req.params.id.toString();
      const validator = await rateValidator.validate(req.body);

      const rate = {
        rating: validator.rating,
        user: req.user as UserInfo,
      };

      res.json(await rateRepo.create(trackId, rate));
    })
  );

  return router;
}
