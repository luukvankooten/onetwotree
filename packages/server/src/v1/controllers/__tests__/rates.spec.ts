import superTest from "supertest";

describe("Rate track RUD", () => {
  it("Should not create deu to empty body", async () => {
    const [repo, app] = buildApp();

    const track = await repo.trackRepo.findBySpotifyId(
      "27NovPIUIRrOZoCHxABJwK"
    );

    await superTest(app)
      .post(`/api/v1/tracks/${track.id}/rate`)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwZjcxYmU3LTU5MTYtNGJlMC1iODJiLWVmY2RhZTE1YTNlZCIsIm5hbWUiOiJMdXVrIiwidXNlcm5hbWUiOiJrb29sMTcxIiwiZW1haWwiOiJsdXVrdmFua29vdGVuQGdtYWlsLmNvbSIsImlhdCI6MTYzODc4NDE4NX0.-fm1RvTNn7ouqV0X6Fyhn-LhVqdzsNMnM5RyM_jBn54"
      )
      .expect(400);
  });

  it("Should create rate", async () => {
    const [repo, app] = buildApp();

    const track = await repo.trackRepo.findBySpotifyId(
      "27NovPIUIRrOZoCHxABJwK"
    );

    const rate = await superTest(app)
      .post(`/api/v1/tracks/${track.id}/rate`)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwZjcxYmU3LTU5MTYtNGJlMC1iODJiLWVmY2RhZTE1YTNlZCIsIm5hbWUiOiJMdXVrIiwidXNlcm5hbWUiOiJrb29sMTcxIiwiZW1haWwiOiJsdXVrdmFua29vdGVuQGdtYWlsLmNvbSIsImlhdCI6MTYzODc4NDE4NX0.-fm1RvTNn7ouqV0X6Fyhn-LhVqdzsNMnM5RyM_jBn54"
      )
      .send({
        rating: 4,
      });

    const get = await repo.rateRepo.get(rate.body.id);

    expect(get.id).toBe(rate.body.id);
  });

  it("Should not found remove", async () => {
    const [repo, app] = buildApp();

    const removed = await superTest(app)
      .delete(`/api/v1/rates/1234`)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwZjcxYmU3LTU5MTYtNGJlMC1iODJiLWVmY2RhZTE1YTNlZCIsIm5hbWUiOiJMdXVrIiwidXNlcm5hbWUiOiJrb29sMTcxIiwiZW1haWwiOiJsdXVrdmFua29vdGVuQGdtYWlsLmNvbSIsImlhdCI6MTYzODc4NDE4NX0.-fm1RvTNn7ouqV0X6Fyhn-LhVqdzsNMnM5RyM_jBn54"
      )
      .expect(400);
  });

  it("Should not be found", async () => {
    // 61b3bcd99d2fb9ee8cc77ca3

    const [repo, app] = buildApp();

    const removed = await superTest(app)
      .get(`/api/v1/rates/61b3bcd99d2fb9ee8cc77ca3`)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwZjcxYmU3LTU5MTYtNGJlMC1iODJiLWVmY2RhZTE1YTNlZCIsIm5hbWUiOiJMdXVrIiwidXNlcm5hbWUiOiJrb29sMTcxIiwiZW1haWwiOiJsdXVrdmFua29vdGVuQGdtYWlsLmNvbSIsImlhdCI6MTYzODc4NDE4NX0.-fm1RvTNn7ouqV0X6Fyhn-LhVqdzsNMnM5RyM_jBn54"
      )
      .expect(404);
  });

  it("Should remove", async () => {
    const [repo, app] = buildApp();

    const track = await repo.trackRepo.findBySpotifyId(
      "27NovPIUIRrOZoCHxABJwK"
    );
    const user = await repo.userRepo.get(
      "50f71be7-5916-4be0-b82b-efcdae15a3ed"
    );
    const rate = await repo.rateRepo.create(track.id, {
      rating: 3,
      user,
    });

    const removed = await superTest(app)
      .delete(`/api/v1/rates/${rate.id}`)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwZjcxYmU3LTU5MTYtNGJlMC1iODJiLWVmY2RhZTE1YTNlZCIsIm5hbWUiOiJMdXVrIiwidXNlcm5hbWUiOiJrb29sMTcxIiwiZW1haWwiOiJsdXVrdmFua29vdGVuQGdtYWlsLmNvbSIsImlhdCI6MTYzODc4NDE4NX0.-fm1RvTNn7ouqV0X6Fyhn-LhVqdzsNMnM5RyM_jBn54"
      )
      .expect(200);

    expect(rate.id).toBe(removed.body.id);
  });

  it("Should update", async () => {
    const [repo, app] = buildApp();

    const track = await repo.trackRepo.findBySpotifyId(
      "27NovPIUIRrOZoCHxABJwK"
    );
    const user = await repo.userRepo.get(
      "50f71be7-5916-4be0-b82b-efcdae15a3ed"
    );
    const rate = await repo.rateRepo.create(track.id, {
      rating: 3,
      user,
    });

    const removed = await superTest(app)
      .put(`/api/v1/rates/${rate.id}`)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwZjcxYmU3LTU5MTYtNGJlMC1iODJiLWVmY2RhZTE1YTNlZCIsIm5hbWUiOiJMdXVrIiwidXNlcm5hbWUiOiJrb29sMTcxIiwiZW1haWwiOiJsdXVrdmFua29vdGVuQGdtYWlsLmNvbSIsImlhdCI6MTYzODc4NDE4NX0.-fm1RvTNn7ouqV0X6Fyhn-LhVqdzsNMnM5RyM_jBn54"
      )
      .send({
        rating: 2,
      })
      .expect(200);

    expect(2).toBe(removed.body.rating);
  });
});
