const app = require("../../app");
const request = require("supertest");
require("jest-fetch-mock").enableMocks();

describe("/emissions", () => {
  describe("/plane", () => {
    test("response code is 400 if no query parameters are given", async () => {

      let response = await request(app).get("/emissions/plane");
      expect(response.status).toEqual(400);
  
    });

    test("response code is 200 when given distance and passengers params", async () => {
      fetch.mockResponse(
        JSON.stringify({
          co2e: 63.094792,
        })
      );
      let response = await request(app).get(
        "/emissions/plane?distance=100&passengers=1"
      );
      expect(response.status).toEqual(200);
    });

    test("calls fetch and loads the co2e value", async () => {
      fetch.mockResponse(
        JSON.stringify({
          co2e: 63.094792,
        })
      );
      let response = await request(app).get(
        "/emissions/plane?distance=100&passengers=1"
      );
      expect(response.status).toEqual(200);
      expect(response.body.co2e).toEqual(63.094792);
    });
  });
});
