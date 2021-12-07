import express, { Request } from "express";
import {
  validateLoginUser,
  validateRegisterUser,
  validateToken,
} from "@12tree/validation";
import crypto from "crypto";
import { userRepo } from "../index";
import jwt from "jsonwebtoken";
import { hash, Token, User, verify } from "@12tree/domain";
import passport from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
  SecretOrKeyProvider,
} from "passport-jwt";

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

  console.log(nonAuthenicatedUser);

  const user = await userRepo.get(nonAuthenicatedUser.id);

  done(false, user?.token.refreshToken);
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider,
      passReqToCallback: true,
    },
    async (req: Request, payload: any, done: VerifiedCallback) => {
      const user = await userRepo.get(payload.id);

      if (!user) {
        return done(false, null, { message: "User is ghost" });
      }

      //TODO: use refresh token

      return done(null, user);
    }
  )
);

const router = express.Router();

router.get("/spotify/callback", (req, res) => {
  console.log(req, res);

  res.status(200).end();
});

router.post("/register", async (req, res) => {
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

  console.log(createdUser.id, newUser.id);

  res.json(createdUser);
});

router.post("/login", async (req, res) => {
  const [err, nonAuthenicatedUser] = await validateLoginUser(req.body);

  if ((err && !nonAuthenicatedUser) || !nonAuthenicatedUser) {
    res.status(400).json(err);
    return;
  }

  const persitentUser = await userRepo.getByEmail(nonAuthenicatedUser.email);

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
});

export default router;
