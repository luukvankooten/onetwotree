import { SearchTrack } from "@12tree/domain/src/entities/track";
import express from "express";
import { trackRepo } from "../..";

const router = express.Router();

router.get("/search", async (req, res) => {
  const query = req.query.q?.toString();

  if (!query) {
    res.json([]);
    return;
  }

  try {
    res.json(await trackRepo.search(query));
  } catch (err) {
    res.json([]);
  }
});

export default router;
