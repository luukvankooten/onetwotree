import express from "express";
import passport from "passport";
import path from "path";
import cors from "cors";
import {
  commentControllers,
  trackControllers,
  userControllers,
} from "./src/v1";
import authController from "./src/auth";

const app = express();
const port = process.env.PORT || 3000;
const serve_path = process.env.SERVE_PATH || "public";
const redirect_url = process.env.REDIRECT_URL || "/";
const host = process.env.BACKEND_URL;
const client_id = process.env.SPOTIFY_CLIENT_ID || "";
const client_secret = process.env.SPOTIFY_CLIENT_SECRET || "";

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(passport.initialize());
app.use(express.json());
app.use("/auth", authController);

const apiV1 = express.Router();
apiV1.use("/comments", commentControllers);
apiV1.use("/users", userControllers);
apiV1.use("/tracks", trackControllers);
app.use(
  "/api/v1",
  passport.authenticate("jwt", {
    session: false,
  }),
  apiV1
);

app.use(express.static(path.join(__dirname, serve_path)));
app.all("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, serve_path, "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
