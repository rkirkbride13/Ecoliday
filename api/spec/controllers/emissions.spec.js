const app = require("../../app");
const request = require("supertest");
require("jest-fetch-mock").enableMocks();

describe("/emissions", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("response code is 400 if the passengers query parameter is not numerical", async () => {
    let response = await request(app).get(
      "/emissions?distance=100&passengers=person"
    );

    expect(response.status).toEqual(400);
  });

  test("response code is 400 if the distance query parameter is not numerical", async () => {
    let response = await request(app).get(
      "/emissions?distance=one&passengers=1"
    );

    expect(response.status).toEqual(400);
  });

  test("response code is 400 if no query parameters are given", async () => {
    let response = await request(app).get("/emissions");
    expect(response.status).toEqual(400);
  });

  test("response code is 200 when given distance and passengers params", async () => {
    fetch.mockResponse(
      JSON.stringify({
        co2e: 63.094792,
      })
    );
    let response = await request(app).get(
      "/emissions?distance=100&passengers=1"
    );
    expect(response.status).toEqual(200);
  });

  test("calls fetch for plane co2e value", async () => {
    fetch.mockResponse(
      JSON.stringify({
        co2e: 63.094792,
      })
    );
    let response = await request(app).get(
      "/emissions?distance=100&passengers=1"
    );

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.stringContaining(
          "passenger_flight-route_type_international-aircraft_type_na-distance_short_haul_lt_3700km-class_na-rf_included"
        ),
      })
    );
  });

  test("calls fetch for train co2e value", async () => {
    fetch.mockResponse(
      JSON.stringify({
        co2e: 63.094792,
      })
    );
    let response = await request(app).get(
      "/emissions?distance=100&passengers=1"
    );

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.stringContaining(
          "passenger_train-route_type_international_rail-fuel_source_na",
          "fuel_combustion",
          "2022"
        ),
      })
    );

    expect(response.status).toEqual(200);
    expect(response.body.co2e).toEqual(63.094792);
  });

  test("calls fetch for Petrol car co2e value", async () => {
    fetch.mockResponse(
      JSON.stringify({
        co2e: 63.094792,
      })
    );
    let response = await request(app).get(
      "/emissions?distance=100&passengers=1"
    );

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.stringContaining(
          "passenger_vehicle-vehicle_type_car-fuel_source_petrol-engine_size_na-vehicle_age_na-vehicle_weight_na",
          "fuel_combustion",
          "2022"
        ),
      })
    );

    expect(response.status).toEqual(200);
    expect(response.body.co2e).toEqual(63.094792);
  });

  test("calls fetch for EV car co2e value", async () => {
    fetch.mockResponse(
      JSON.stringify({
        co2e: 63.094792,
      })
    );
    let response = await request(app).get(
      "/emissions?distance=100&passengers=1"
    );

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.stringContaining(
          "passenger_vehicle-vehicle_type_car-fuel_source_bev-engine_size_na-vehicle_age_na-vehicle_weight_na",
          "electricity_generation",
          "2022"
        ),
      })
    );

    expect(response.status).toEqual(200);
    expect(response.body.co2e).toEqual(63.094792);
  });
});
