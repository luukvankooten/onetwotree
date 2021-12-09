import supertest from "supertest";

describe("Comments CRUD", () => {
  it("should create comment", async () => {
    const [repos, app] = buildApp();

    const track = await repos.trackRepo.findBySpotifyId(
      "27NovPIUIRrOZoCHxABJwK"
    );

    const response = await supertest(app)
      .post(`/api/v1/tracks/${track.id}/comment`)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwZjcxYmU3LTU5MTYtNGJlMC1iODJiLWVmY2RhZTE1YTNlZCIsIm5hbWUiOiJMdXVrIiwidXNlcm5hbWUiOiJrb29sMTcxIiwiZW1haWwiOiJsdXVrdmFua29vdGVuQGdtYWlsLmNvbSIsImlhdCI6MTYzODc4NDE4NX0.-fm1RvTNn7ouqV0X6Fyhn-LhVqdzsNMnM5RyM_jBn54"
      )
      .send({
        comment: "hello world",
      })
      .expect(200);

    expect(response.body.comment).toBe("hello world");

    expect(repos.commentRepo.get(response.body.id)).resolves.not.toThrow();
  });

  it("should fail to create comment", async () => {});

  it("should update comment", async () => {
    const [repos, app] = buildApp();

    const user = await repos.userRepo.get(
      "50f71be7-5916-4be0-b82b-efcdae15a3ed"
    );

    const track = await repos.trackRepo.findBySpotifyId(
      "27NovPIUIRrOZoCHxABJwK"
    );

    const comment = await repos.commentRepo.create(track.id, {
      comment: "foo",
      user,
    });

    const response = await supertest(app)
      .put(`/api/v1/comments/${comment.id}`)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwZjcxYmU3LTU5MTYtNGJlMC1iODJiLWVmY2RhZTE1YTNlZCIsIm5hbWUiOiJMdXVrIiwidXNlcm5hbWUiOiJrb29sMTcxIiwiZW1haWwiOiJsdXVrdmFua29vdGVuQGdtYWlsLmNvbSIsImlhdCI6MTYzODc4NDE4NX0.-fm1RvTNn7ouqV0X6Fyhn-LhVqdzsNMnM5RyM_jBn54"
      )
      .send({
        comment: "baz",
      })
      .expect(200);

    expect(response.body).toMatchObject({
      comment: "baz",
    });
  });
});
