import superTest from "supertest";

describe("Test RUD", () => {
  it("should read", async () => {
    const [repos, app] = buildApp();

    const response = await superTest(app)
      .get("/api/v1/tracks/spotify/27NovPIUIRrOZoCHxABJwK")
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwZjcxYmU3LTU5MTYtNGJlMC1iODJiLWVmY2RhZTE1YTNlZCIsIm5hbWUiOiJMdXVrIiwidXNlcm5hbWUiOiJrb29sMTcxIiwiZW1haWwiOiJsdXVrdmFua29vdGVuQGdtYWlsLmNvbSIsImlhdCI6MTYzODc4NDE4NX0.-fm1RvTNn7ouqV0X6Fyhn-LhVqdzsNMnM5RyM_jBn54"
      )
      .expect(200);

    expect(response.body.name).toBe("INDUSTRY BABY (feat. Jack Harlow)");

    expect(repos.trackRepo.get(response.body.id)).resolves.toBeDefined();
  });

  it("should throw not found error", async () => {
    const [repos, app] = buildApp();

    const response = await superTest(app)
      .get("/api/v1/tracks/spotify/27NovPIUIRrOZ")
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwZjcxYmU3LTU5MTYtNGJlMC1iODJiLWVmY2RhZTE1YTNlZCIsIm5hbWUiOiJMdXVrIiwidXNlcm5hbWUiOiJrb29sMTcxIiwiZW1haWwiOiJsdXVrdmFua29vdGVuQGdtYWlsLmNvbSIsImlhdCI6MTYzODc4NDE4NX0.-fm1RvTNn7ouqV0X6Fyhn-LhVqdzsNMnM5RyM_jBn54"
      )
      .expect(404);

    expect(repos.trackRepo.get(response.body.id)).rejects.toThrow();
  });
});
