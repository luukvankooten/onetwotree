import { IRatingReposistory, User } from "@12tree/domain";
import { rateValidator } from "@12tree/validation";
import express, { Router } from "express";
import asyncHandler from "express-async-handler";

interface RateDependencies {
  rateRepo: IRatingReposistory;
}

export default function ({ rateRepo }: RateDependencies): Router {
  const router = express.Router();

  router.get(
    "/:id",
    asyncHandler(async (req, res) => {
      res.json(await rateRepo.get(req.params.id.toString()));
    })
  );

  router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
      res.json(await rateRepo.delete(req.params.id.toString()));
    })
  );

  router.put(
    "/:id",
    asyncHandler(async (req, res) => {
      const id = req.params.id.toString();
      const user: User = req.user as User;

      const validator = await rateValidator.validate(req.body);

      const rate = {
        id,
        rating: validator.rating,
        user,
      };

      res.json(await rateRepo.update(id, rate));
    })
  );

  return router;
}
