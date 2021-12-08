import express, { Router } from "express";

export default function (): Router {
  const users = express.Router();

  users.get("/me", (req, res) => {
    res.json(req.user);
  });

  return users;
}
