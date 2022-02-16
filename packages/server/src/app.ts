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

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err) {
      console.error(err);

      if ("NotFoundError" === err.name) {
        res.status(404);
      } else if ("ValidationError" === err.name) {
        res.status(400);
      } else if ("WebapiRegularError" === err.name && err.statusCode === 400) {
        res.status(404);
      } else if ("Unauthorized" === err.name) {
        res.status(401);
      } else if ("CastError" === err.name) {
        res.status(400);
      } else {
        //Show http 500
        res.status(500).end();

        return;
      }

      res.json({
        message: err.message,
      });

      return;
    }

    next();
  };

  app.use("/auth", authController({ userRepo }), errorHandler);

  const apiV1 = express.Router();
  apiV1.use("/comments", commentControllers({ commentRepo }));
  apiV1.use("/users", userControllers(userRepo));
  apiV1.use("/tracks", trackControllers({ trackRepo, rateRepo, commentRepo }));
  apiV1.use("/rates", rateControllers({ rateRepo }));

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
