const supertest = require("supertest");
const startServer = require("./authServer");

describe("Authroute Posts", () => {
  beforeAll(async () => {
    authserver = await startServer();
  });
  afterAll(async () => {
    await authserver.close();
  });
  describe("POST /login ", () => {
    test("should return status 200 ", async () => {
      const res = await supertest(authserver)
        .post("/auth/login")
        .send({ username: "farshinasri@gmail.com", password: "123" });

      expect(res.status).toBe(200);
    });
  });
});
