import express from "express";
import { commentRepo } from "../../index";
import { commentValidator } from "@12tree/validation";
import validator from "@12tree/validation/src/comment";

const router = express.Router();

const response = async (req: any, res: any, next: any) => {
  next();
};

router.get("/", async (req, res) => {
  res.json(await commentRepo.getAll());
});

router.get("/:id", async (req, res) => {
  let comment = await commentRepo.get(req.params.id);

  if (!comment) {
    res.status(404).end();
  }

  res.json(comment).end();
});

router.delete("/:id", async (req, res) => {
  let deleted = await commentRepo.delete(req.params.id);

  if (deleted) {
    res.status(204).end();
  }

  res.status(404).end();
});

router.put("/:id", async (req, res) => {
  let validator;

  try {
    validator = await commentValidator.validate(req.body);
  } catch (err) {
    res.status(400).json(err).end();

    return;
  }

  const comment = await commentRepo.update(req.params.id, { ...validator });

  if (!comment) {
    res.status(404).end();
  }

  res.json(comment);
});

router.post("/", response);

export default router;
