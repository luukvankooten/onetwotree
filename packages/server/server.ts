import { User } from "@12tree/domain";
import express from "express";
import passport from "passport";
import { Profile, Strategy as SpotifyStrategy } from "passport-spotify";
import { Strategy as BearerStrategy } from "passport-http-bearer";

const app = express();
const port = process.env.PORT || 3000;

const users: User[] = [];

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

passport.use(
  new SpotifyStrategy(
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
  )
);

passport.use(
  new BearerStrategy(function (token, done) {
    let user: User | undefined = users.find((user) => user.token === token);

    console.log(user);

    if (!user) {
      return done(null, false);
    }

    return done(null, user, { scope: "all" });
  })
);

app.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify", { session: false }),
  function (req, res) {
    // console.log(req, res);
    res.json(true);
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
  passport.authenticate("bearer", { session: false }),
  function (req, res) {
    res.send("/api/user/me");
  }
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
