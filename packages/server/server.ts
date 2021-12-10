import builder from "@12tree/infrastructure";
import {
  Neo4jConnection,
  MongooseConnection,
  SpotifyApiConnection,
} from "@12tree/infrastructure/src/connections";
import express from "./src/app";

const app = express({
  repositories: builder(
    MongooseConnection(process.env.MONGO_CONNECTION_STRING || ""),
    SpotifyApiConnection,
    Neo4jConnection
  ),
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(process.env);
});
