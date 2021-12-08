import express, { ErrorRequestHandler, Express } from "express";
import passport from "passport";
import path from "path";
import cors from "cors";
import {
  commentControllers,
  rateControllers,
  trackControllers,
  userControllers,
} from "./v1";
import authController, { jwtAuthenication } from "./auth";
import { Repositories } from "@12tree/domain";

interface AppDependencies {
  repositories: Repositories;
}

export default function ({
  repositories: { commentRepo, rateRepo, userRepo, trackRepo },
}: AppDependencies): Express {
  const app = express();
  const serve_path = process.env.SERVE_PATH || "public";
  const redirect_url = process.env.REDIRECT_URL || "/";

  app.use(cors({ origin: process.env.FRONTEND_URL }));
  app.use(passport.initialize());
  passport.use(jwtAuthenication({ userRepo }));
  app.use(express.json());
  app.use("/auth", authController({ userRepo }));

  const apiV1 = express.Router();
  apiV1.use("/comments", commentControllers({ commentRepo }));
  apiV1.use("/users", userControllers());
  apiV1.use("/tracks", trackControllers({ trackRepo, rateRepo, commentRepo }));
  apiV1.use("/rates", rateControllers({ rateRepo }));

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err) {
      console.log(err.name);

      if (process.env.NODE_ENV !== "production") {
        console.error(err);
      }

      if ("NotFoundError" === err.name) {
        res.status(404);
      } else if ("ValidationError" === err.name) {
        res.status(400);
      } else {
        res.status(500);
      }

      res.json({
        message: err.message,
      });

      return;
    }

    next();
  };

  app.use(
    "/api/v1",
    passport.authenticate("jwt", {
      session: false,
    }),
    apiV1,
    errorHandler
  );

  app.use(express.static(path.join(__dirname, serve_path)));
  app.all("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, serve_path, "index.html"));
  });

  return app;
}
