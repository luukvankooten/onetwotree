import express, { Request, Router } from "express";
import {
  updateUservalidatorObject,
  validateLoginUser,
  validateRegisterUser,
  validateToken,
} from "@12tree/validation";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import {
  hash,
  IUserReposistory,
  Token,
  Unauthorized,
  User,
  verify,
} from "@12tree/domain";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
  SecretOrKeyProvider,
} from "passport-jwt";
import asyncHandler from "express-async-handler";

interface jwtAuthenicationDependencies {
  userRepo: IUserReposistory;
}

export function jwtAuthenication({
  userRepo,
}: jwtAuthenicationDependencies): JwtStrategy {
  const secretOrKeyProvider: SecretOrKeyProvider = async (
    req,
    rawJwtToken,
    done
  ) => {
    const [err, nonAuthenicatedUser] = await validateToken(
      jwt.decode(rawJwtToken)
    );

    if ((err && !nonAuthenicatedUser) || !nonAuthenicatedUser) {
      return done(err, undefined);
    }

    const user = await userRepo.getWithToken(nonAuthenicatedUser.id);

    if (!user) {
      return done(null, undefined);
    }

    req.user = user;

    done(false, user.token.refreshToken);
  };

  return new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider,
      passReqToCallback: true,
    },
    async (req: Request, payload: any, done: VerifiedCallback) => {
      if (!req.user) {
        return done(false, null, { message: "User is ghost" });
      }

      return done(null, req.user);
    }
  );
}

interface AuthDependencies {
  userRepo: IUserReposistory;
}

export default function ({ userRepo }: AuthDependencies): Router {
  const router = express.Router();

  router.get("/spotify/callback", (req, res) => {
    console.log(req, res);

    res.status(200).end();
  });

  router.post(
    "/register",
    asyncHandler(async (req, res) => {
      const [err, user] = await validateRegisterUser(req.body);

      if ((err && !user) || !user) {
        res.status(400).json(err);
        return;
      }

      const refreshToken = await hash(user.password);

      const newUser = {
        id: crypto.randomUUID(),
        name: user.name,
        username: user.username,
        email: user.email,
      };

      const token: Token = {
        refreshToken: refreshToken,
        accessToken: jwt.sign(newUser, refreshToken),
        expiresIn: 3600,
        createdAt: Date.now(),
      };

      const createdUser = await userRepo.create({ ...newUser, token: token });

      if (!createdUser) {
        res.status(402).end();
        return;
      }

      res.json(createdUser);
    })
  );

  router.post(
    "/login",
    asyncHandler(async (req, res) => {
      const [err, nonAuthenicatedUser] = await validateLoginUser(req.body);

      if ((err && !nonAuthenicatedUser) || !nonAuthenicatedUser) {
        res.status(400).json(err);
        return;
      }

      const persitentUser = await userRepo.getByEmail(
        nonAuthenicatedUser.email
      );

      if (
        persitentUser &&
        (await verify(
          nonAuthenicatedUser.password,
          persitentUser.token.refreshToken
        ))
      ) {
        res.json(persitentUser);

        return;
      }

      res.status(401).end();
    })
  );

  return router;
}
