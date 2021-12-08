import superTest from "supertest";
import builder from "@12tree/infrastructure";
import {
  Neo4jConnection,
  MongooseConnection,
  SpotifyApiConnection,
} from "@12tree/infrastructure/src/connections";
import express from "../../../app";

describe("Test RUD", () => {
  it("should read", (done) => {
    superTest(
      express({
        repositories: builder(
          MongooseConnection,
          SpotifyApiConnection,
          Neo4jConnection
        ),
      })
    )
      .get("/api/v1/users/me")
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwZjcxYmU3LTU5MTYtNGJlMC1iODJiLWVmY2RhZTE1YTNlZCIsIm5hbWUiOiJMdXVrIiwidXNlcm5hbWUiOiJrb29sMTcxIiwiZW1haWwiOiJsdXVrdmFua29vdGVuQGdtYWlsLmNvbSIsImlhdCI6MTYzODc4NDE4NX0.-fm1RvTNn7ouqV0X6Fyhn-LhVqdzsNMnM5RyM_jBn54"
      )
      .expect(200)
      .then((response) => {
        expect(response.body.name).toBe("Luuk");
        done();
      })
      .catch((err) => done(err));
  });
});
