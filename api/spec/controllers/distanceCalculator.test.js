const DistanceController = require("../../controllers/distance");
require("jest-fetch-mock").enableMocks();

describe("DistanceController", () => {
  let req;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(
      JSON.stringify({
        results: [{ lon: -0.11534, lat: 51.51413 }],
      })
    );
    fetch.mockResponseOnce(
      JSON.stringify({
        results: [{ lon: 13.40488, lat: 52.50176 }],
      })
    );
    req = {
      query: {
        to: "Berlin",
        from: "London",
        passengers: "2",
      },
      locals: {},
    };
  });

  it("sends a request when given a 'from' location", async () => {
    await DistanceController.Calculate(req, {}, () => {});

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        "https://api.geoapify.com/v1/geocode/search?text=London&format=json"
      )
    );
  });

  it("sends a request when given a 'to' location", async () => {
    await DistanceController.Calculate(req, {}, () => {});

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        "https://api.geoapify.com/v1/geocode/search?text=Berlin&format=json"
      )
    );
  });

  it("add distance to req.query", async () => {
    await DistanceController.Calculate(req, {}, () => {});

    expect(req.query.distance).toEqual(930.5084324079236);
  });

  it("check next has been called after distance calculated", async () => {
    const next = jest.fn(() => {});

    await DistanceController.Calculate(req, {}, next);

    expect(next).toHaveBeenCalled();
  });

  it("responds with 400 if from is empty", async () => {
    const send = jest.fn((object) => {});
    const res = {
      status: jest.fn((status) => {
        return { send: send };
      }),
    };
    const next = jest.fn(() => {});

    req.query.from = undefined;
    await DistanceController.Calculate(req, res, next);
    expect(res.status).toHaveBeenLastCalledWith(400);

    req.query.from = "";
    await DistanceController.Calculate(req, res, next);
    expect(res.status).toHaveBeenLastCalledWith(400);
    expect(send).toHaveBeenCalledTimes(2);
    expect(next).not.toHaveBeenCalled();
  });

  it("responds with 400 if to is empty", async () => {
    const send = jest.fn((object) => {});
    const res = {
      status: jest.fn((status) => {
        return { send: send };
      }),
    };
    const next = jest.fn(() => {});

    req.query.to = undefined;
    await DistanceController.Calculate(req, res, next);
    expect(res.status).toHaveBeenLastCalledWith(400);

    req.query.to = "";
    await DistanceController.Calculate(req, res, next);
    expect(res.status).toHaveBeenLastCalledWith(400);
    expect(send).toHaveBeenCalledTimes(2);
    expect(next).not.toHaveBeenCalled();
  });

  it("responds with 400 if results is empty", async () => {
    fetch.resetMocks();
    fetch.mockResponse(
      JSON.stringify({
        results: [],
      })
    );

    const res = {
      status: (status) => {
        return { json: (object) => {} };
      },
    };
    const next = jest.fn(() => {});

    await DistanceController.Calculate(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });

  it("adds from city and country to req.locals", async () => {
    await DistanceController.Calculate(req, {}, () => {});

    expect(req.locals.from).toEqual({ prov: "UK", city: "London" });
  });

  it("adds to city and country to req.locals", async () => {
    await DistanceController.Calculate(req, {}, () => {});

    expect(req.locals.to).toEqual({ prov: "DE", city: "Berlin" });
  });
});
