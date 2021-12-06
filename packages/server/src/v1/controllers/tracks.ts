import express from "express";
import { trackRepo } from "../..";

const router = express.Router();

router.get("/search", async (req, res) => {
  const query = req.query.q?.toString();

  if (!query) {
    res.json([]);
    return;
  }

  res.json(await trackRepo.search(query));
});

export default router;
