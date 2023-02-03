const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("post when email and password are provided", () => {
    it("gives response code 201", async () => {
      let response = await request(app)
        .post("/users")
        .send({ email: "test@email.com", password: "password" });
      expect(response.statusCode).toBe(201);
    });
  });
});
