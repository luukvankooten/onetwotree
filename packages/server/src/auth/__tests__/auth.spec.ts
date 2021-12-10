import supertest from "supertest";

describe("Auth test", () => {
  it("Should not register user", async () => {
    const [repos, app] = buildApp();

    const response = await supertest(app)
      .post("/auth/register")
      .set("Accept", "application/json")
      .send({
        name: "Putin",
        username: "RusPut123",
        email: "putin@gmail.com",
        password: "123456",
      })
      .expect(400);

    expect(response.body.message).toBe(
      "password must be at least 8 characters"
    );
  });

  it("should not register due to empty body", async () => {
    const [repos, app] = buildApp();

    const response = await supertest(app)
      .post("/auth/register")
      .set("Accept", "application/json")
      .send()
      .expect(400);

    expect(response.body.message).toBe("password is a required field");
  });

  it("should register and be saved", async () => {
    const [repos, app] = buildApp();

    const response = await supertest(app)
      .post("/auth/register")
      .set("Accept", "application/json")
      .send({
        name: "Putin",
        username: "RusPut123",
        email: "putin@gmail.com",
        password: "12345678",
      })
      .expect(200);

    expect(response.body.name).toBe("Putin");

    expect(repos.userRepo.get(response.body.id)).resolves.toMatchObject({
      name: "Putin",
      username: "RusPut123",
      email: "putin@gmail.com",
    });
  });

  it("should be unautherized", async () => {
    let [repo, app] = buildApp();

    await supertest(app).get("/api/v1/users/me").send().expect(401);
  });

  it("should not update", async () => {
    let [repo, app] = buildApp();

    await supertest(app)
      .put("/api/v1/users/50f71be7-5916-4be0-b82b-efcdae15a3ed")
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ4M2M4Y2NhLTk2YzItNGFkMi1hNmFmLTBhMjIwZDBmYTg3OSIsIm5hbWUiOiJMdXVrdjEiLCJ1c2VybmFtZSI6Imx1dWtraWUiLCJlbWFpbCI6ImwudmFua29vdGVuQHN0dWRlbnQuY29tIiwiaWF0IjoxNjM5MDU4MDIwfQ.QVho_Qo9P_WUt9UoSNGSxSGOt4Bpz98-Dc97zu0Uh-o"
      )
      .send({
        name: "new name",
      })
      .expect(401);
  });
});
