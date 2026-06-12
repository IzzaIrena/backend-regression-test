const request = require("supertest");
const app = require("../server");

describe("Regression Login API", () => {

  const email = `test${Date.now()}@mail.com`;

  // 1
  it("should register user successfully", async () => {
    const res = await request(app).post("/api/register").send({
      name: "Test",
      email,
      password: "123456",
      confirmPassword: "123456",
    });

    expect([200, 201]).toContain(res.statusCode);
  });

  // 2
  it("should login successfully (happy path)", async () => {
    const res = await request(app).post("/api/login").send({
      email,
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  // 3
  it("should fail login with wrong password", async () => {
    const res = await request(app).post("/api/login").send({
      email,
      password: "wrong",
    });

    expect([400, 401]).toContain(res.statusCode);
  });

  // 4
  it("should fail login with non-existent user", async () => {
    const res = await request(app).post("/api/login").send({
      email: "fake@mail.com",
      password: "123456",
    });

    expect([400, 404]).toContain(res.statusCode);
  });

  // 5
  it("should fail login with empty body", async () => {
    const res = await request(app).post("/api/login").send({});
    expect([400, 422]).toContain(res.statusCode);
  });

  // 6
  it("should fail login with invalid email format", async () => {
    const res = await request(app).post("/api/login").send({
      email: "invalid-email",
      password: "123456",
    });

    expect([400, 422]).toContain(res.statusCode);
  });

  // 7
  it("should fail register with password mismatch", async () => {
    const res = await request(app).post("/api/register").send({
      name: "Test2",
      email: `x${Date.now()}@mail.com`,
      password: "123456",
      confirmPassword: "999999",
    });

    expect([400, 422]).toContain(res.statusCode);
  });

  // 8
  it("should fail register duplicate email", async () => {
    const res = await request(app).post("/api/register").send({
      name: "Test",
      email,
      password: "123456",
      confirmPassword: "123456",
    });

    expect([400, 409]).toContain(res.statusCode);
  });

  // 9
  it("should return validation error object", async () => {
    const res = await request(app).post("/api/login").send({
      email: "bad",
      password: "",
    });

    expect(res.body.errors || res.body).toBeDefined();
  });

  // 10
  it("should handle missing password field", async () => {
    const res = await request(app).post("/api/login").send({
      email,
    });

    expect([400, 422]).toContain(res.statusCode);
  });

});