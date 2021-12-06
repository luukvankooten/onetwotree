import express, { Request, Response } from "express";

const users = express.Router();

users.get("/me", (req, res) => {
  res.json(req.user);
});

export default users;
