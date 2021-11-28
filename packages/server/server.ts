import { User } from "@12tree/domain";
import express from "express";
import passport from "passport";
import { Profile, Strategy as SpotifyStrategy } from "passport-spotify";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import path from "path";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

const users: User[] = [
  {
    username: "luuk171",
    token:
      "BQCpzkApjYqrWsp7sow8MXnllR8PyKseUV1vDw0uDJnW5OqQajHAtKdGyNty_L0qczkcHz87FjbV0XFMCHE7aXNuXSnkx9AnnEv6dG6mDir5eLClLNkexFosJRfOgvj9jlgr7Pg2if_umrPktOL4114g6tyAMg",
    email: "171luuk@gmail.com",
    name: "luuk171",
  },
];

app.use(cors());

function createUser(profile: Profile, token: string): User {
  let user: User = {
    username: profile.displayName,
    token,
    email: profile.emails?.shift()?.value ?? "",
    name: profile.username,
  };

  users.push(user);

  return user;
}

app.use(passport.initialize());

const spotify = new SpotifyStrategy(
  {
    clientID: "2ce0b37caf4b454587e2e62c517b17ea",
    clientSecret: "d20882d27526426d8143f85ba3ef96e8",
    callbackURL: `http://localhost:${port}/auth/spotify/callback`,
    scope: ["user-read-email", "user-read-private"],
  },
  function (accessToken, refreshToken, expires_in, profile, done) {
    process.nextTick(function () {
      let user: User =
        users.find((user) => user.token === accessToken) ??
        createUser(profile, accessToken);

      return done(null, user);
    });
  }
);

passport.use(spotify);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    },
    function (jwt_payload, done) {
      console.log(jwt_payload);
      const token = jwt_payload.token;

      if (!token) {
        return done(false, null, { message: "no token provided" });
      }

      const user: User | undefined = users.find((user) => user.token === token);

      if (!user) {
        return done(false, null, { message: "unauthenicated user" });
      }

      return done(null, user);
    }
  )
);

app.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify", {
    failureRedirect: process.env.REDIRECT_URL,
    session: false,
  }),
  function (req, res) {
    const url = process.env.REDIRECT_URL || "/";
    res.cookie("jwt", jwt.sign(req.user ?? {}, "secret")).redirect(url);
  }
);

app.get(
  "/auth/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private"],
    session: false,
  })
);

app.get(
  "/api/users/me",
  passport.authenticate("jwt", {
    session: false,
  }),
  function (req, res, next) {
    res.json(req.user);
  }
);

const serve_path = process.env.SERVE_PATH || "public";

app.use(express.static(path.join(__dirname, serve_path)));

app.all("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, serve_path, "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
