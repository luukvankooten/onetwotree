import express, { Router } from "express";
import { commentValidator } from "@12tree/validation";
import asyncHandler from "express-async-handler";
import { ICommentRepository, UserInfo } from "@12tree/domain";

interface CommentDependencies {
  commentRepo: ICommentRepository;
}

export default function ({ commentRepo }: CommentDependencies): Router {
  const router = express.Router();

  router.get(
    "/:id",
    asyncHandler(async (req, res) => {
      res.json(await commentRepo.get(req.params.id));
    })
  );

  router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
      res.json(await commentRepo.delete(req.params.id));
    })
  );

  router.put(
    "/:id",
    asyncHandler(async (req, res) => {
      const validator = await commentValidator.validate(req.body);

      res.json(
        await commentRepo.update(req.params.id, {
          comment: validator.comment,
          user: req.user as UserInfo,
        })
      );
    })
  );

  return router;
}
