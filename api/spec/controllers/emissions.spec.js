const app = require("../../app");
const request = require("supertest");
require("jest-fetch-mock").enableMocks();

describe("/emissions", () => {
  describe("/plane", () => {
    test("response code is 200", async () => {
      let response = await request(app).get("/emissions/plane");
      expect(response.status).toEqual(200);
    });

    test("response code is 200 when given distance and passengers params", async () => {
      let response = await request(app).get(
        "/emissions/plane?distance=100&passengers=1"
      );
      expect(response.status).toEqual(200);
    });
  });
});
