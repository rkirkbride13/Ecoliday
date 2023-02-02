const app = require("../../app");
const request = require("supertest");
require("jest-fetch-mock").enableMocks();

describe("/emissions", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("Response code is 400 if 'from' location not there", async () => {
    let response = await request(app).get("/emissions?to=Berlin&passengers=1");

    expect(response.status).toEqual(400);
  });

  test("Response code is 400 if 'to' location not there", async () => {
    let response = await request(app).get(
      "/emissions?from=Berlin&passengers=1"
    );

    expect(response.status).toEqual(400);
  });

  xtest("response code is 400 if the passengers query parameter is not numerical", async () => {
    let response = await request(app).get(
      "/emissions?distance=100&passengers=person"
    );

    expect(response.status).toEqual(400);
  });

  xtest("response code is 400 if the distance query parameter is not numerical", async () => {
    let response = await request(app).get(
      "/emissions?distance=one&passengers=1"
    );

    expect(response.status).toEqual(400);
  });

  xtest("response code is 400 if no query parameters are given", async () => {
    let response = await request(app).get("/emissions");
    expect(response.status).toEqual(400);
  });

  xtest("response code is 400 if the distance query parameter is not positive", async () => {
    let response = await request(app).get(
      "/emissions?distance=-3&passengers=1"
    );

    expect(response.status).toEqual(400);
  });

  xtest("response code is 400 if the passengers query parameter is less than 1", async () => {
    let response = await request(app).get(
      "/emissions?distance=100&passengers=0"
    );

    expect(response.status).toEqual(400);
  });

  xtest("response code is 400 if the passengers query parameter is an integer", async () => {
    let response = await request(app).get(
      "/emissions?distance=100&passengers=2.5"
    );

    expect(response.status).toEqual(400);
  });

  xtest("response code is 200 when given distance and passengers params", async () => {
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

  xtest("calls fetch for plane co2e value", async () => {
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
          "passenger_flight-route_type_international-aircraft_type_na-distance_short_haul_lt_3700km-class_economy-rf_included"
        ),
      })
    );
  });

  xtest("calls fetch for train co2e value", async () => {
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
  });

  xtest("calls fetch for Petrol car co2e value", async () => {
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
  });

  xtest("calls fetch for EV car co2e value", async () => {
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
  });

  xtest("fetch results are grouped into single response, with total emissions", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        co2e: 63.094792,
      })
    );
    fetch.mockResponseOnce(
      JSON.stringify({
        co2e: 20.094792,
      })
    );
    fetch.mockResponseOnce(
      JSON.stringify({
        co2e: 10.094792,
      })
    );
    fetch.mockResponseOnce(
      JSON.stringify({
        co2e: 1.094792,
      })
    );

    let response = await request(app).get(
      "/emissions?distance=100&passengers=1"
    );

    expect(response.body.emissions.plane.total).toEqual(63.094792);
    expect(response.body.emissions.train.total).toEqual(20.094792);
    expect(response.body.emissions.petrolCar.total).toEqual(10.094792);
    expect(response.body.emissions.electricCar.total).toEqual(1.094792);
  });

  xtest("fetch results are grouped into single response, with per passenger emissions", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        co2e: 63.094792,
      })
    );
    fetch.mockResponseOnce(
      JSON.stringify({
        co2e: 20.094792,
      })
    );
    fetch.mockResponseOnce(
      JSON.stringify({
        co2e: 10.094792,
      })
    );
    fetch.mockResponseOnce(
      JSON.stringify({
        co2e: 1.094792,
      })
    );

    let response = await request(app).get(
      "/emissions?distance=100&passengers=4"
    );

    expect(response.body.emissions.plane.perPassenger).toEqual(63.094792 / 4);
    expect(response.body.emissions.train.perPassenger).toEqual(20.094792 / 4);
    expect(response.body.emissions.petrolCar.perPassenger).toEqual(
      10.094792 / 4
    );
    expect(response.body.emissions.electricCar.perPassenger).toEqual(
      1.094792 / 4
    );
  });
});
