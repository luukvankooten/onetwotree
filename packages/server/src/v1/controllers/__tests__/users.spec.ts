import supertest from "supertest";
import application from "../../../app";
import userRepository from "@12tree/infrastructure/src/userRepository";
import createUserModel from "@12tree/infrastructure/src/schemas/user";
import { Neo4jConnection } from "@12tree/infrastructure/src/connections";

describe("User friends ship CRUD", () => {
  it("should send follow to putin and accept and putin has one follower and biden then unfollows and putin has 0 followers", async () => {
    const [repositories, _app] = buildApp();

    let repos = repositories;

    repos.userRepo = userRepository({
      UserModel: createUserModel(Neo4jConnection),
    });

    let app = application({ repositories: repos });

    const biden_response = await supertest(app)
      .post("/auth/register")
      .set("Accept", "application/json")
      .send({
        name: "biden",
        username: "imbiden",
        email: "imbiden@gmail.com",
        password: "123456789",
      });

    const putin_response = await supertest(app)
      .post("/auth/register")
      .set("Accept", "application/json")
      .send({
        name: "Putin",
        username: "RusPut123",
        email: "putin@gmail.com",
        password: "123456789",
      });

    let biden = biden_response.body;
    let putin = putin_response.body;

    const request_response = await supertest(app)
      .post(`/api/v1/users/follow/${putin.id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${biden.token.accessToken}`)
      .send()
      .expect(200);

    expect(request_response.body).toMatchObject({
      id: putin.id,
    });

    const accept_response = await supertest(app)
      .post(`/api/v1/users/accept/${biden.id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${putin.token.accessToken}`)
      .send()
      .expect(200);

    expect(accept_response.body).toMatchObject({
      id: biden.id,
    });

    const followers = await supertest(app)
      .get("/api/v1/users/followers")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${putin.token.accessToken}`)
      .send()
      .expect(200);

    expect(followers.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: biden.id, accepted: true }),
      ])
    );

    const unfollow = await supertest(app)
      .delete(`/api/v1/users/unfollow/${putin.id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${biden.token.accessToken}`);

    expect(unfollow.body).toMatchObject({
      id: putin.id,
    });

    const empty_followers = await supertest(app)
      .get("/api/v1/users/followers")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${putin.token.accessToken}`)
      .send()
      .expect(200);

    expect(empty_followers.body).toHaveLength(0);

    await repos.userRepo.delete(putin.id);
    await repos.userRepo.delete(biden.id);
  });
});
