import {
  hash,
  ICommentRepository,
  IRatingReposistory,
  ITrackReposistory,
  IUserReposistory,
  Unauthorized,
  User,
} from "@12tree/domain";
import comment from "@12tree/infrastructure/src/schemas/comment";
import { updateUservalidatorObject } from "@12tree/validation";
import express, { Router } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

interface UserControllerDependencies {
  userRepo: IUserReposistory;
  commentRepo: ICommentRepository;
  rateRepo: IRatingReposistory;
  trackRepo: ITrackReposistory;
}

export default function ({
  userRepo,
  commentRepo,
  rateRepo,
  trackRepo,
}: UserControllerDependencies): Router {
  const router = express.Router();

  router.get("/me", (req, res) => {
    res.json(req.user);
  });

  router.post(
    "/follow/:id",
    asyncHandler(async (req, res) => {
      const user = req.user as User;

      const requested = await userRepo.follow(
        user.id,
        req.params.id.toString()
      );

      res.json(requested);
    })
  );

  router.post(
    "/accept/:id",
    asyncHandler(async (req, res) => {
      const user = req.user as User;

      const friend = await userRepo.accept(user.id, req.params.id.toString());

      res.json(friend);
    })
  );

  router.delete(
    "/unfollow/:id",
    asyncHandler(async (req, res) => {
      const user = req.user as User;

      const unfollowed = await userRepo.unfollow(
        user.id,
        req.params.id.toString()
      );

      res.json(unfollowed);
    })
  );

  router.get(
    "/followers",
    asyncHandler(async (req, res) => {
      const user = req.user as User;

      res.json(await userRepo.getFollowers(user.id));
    })
  );

  router.get(
    "/:id",
    asyncHandler(async (req, res) => {
      res.json(await userRepo.get(req.params.id));
    })
  );

  router.put(
    "/:id",
    asyncHandler(async (req, res) => {
      const user = req.user as User;
      const validator = await updateUservalidatorObject.validate(req.body);

      if (req.params.id.toString() !== user.id) {
        throw new Unauthorized();
      }

      let token = user.token;

      if (validator.password) {
        const refreshToken = await hash(validator.password);
        token = {
          refreshToken: refreshToken,
          accessToken: jwt.sign(user, refreshToken),
          expiresIn: 3600,
          createdAt: Date.now(),
        };
      }

      const updateUser = Object.assign(user, validator);

      updateUser.token = token;

      res.json(await userRepo.update(updateUser));
    })
  );

  router.get(
    "/:id/tracks",
    asyncHandler(async (req, res) => {
      const tracks = await trackRepo.findByUserId(req.params.id);

      res.json(tracks.map((track) => track.id));
    })
  );

  router.get(
    "/:id/comments",
    asyncHandler(async (req, res) => {
      const ids = await userRepo.getUserCommentsIds(req.params.id);

      const comments = await commentRepo.getByIds(ids);

      res.json(comments);
    })
  );

  router.get(
    "/:id/ratings",
    asyncHandler(async (req, res) => {
      res.json(await rateRepo.getByUserId(req.params.id));
    })
  );

  return router;
}
