const DistanceController = require("../../controllers/distance");
require("jest-fetch-mock").enableMocks();

describe("DistanceController", () => {
  let req, res;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(
      JSON.stringify({
        results: [
          {
            lon: -0.11534,
            lat: 51.51413,
            formatted: "London, ENG, United Kingdom",
          },
        ],
      })
    );
    fetch.mockResponseOnce(
      JSON.stringify({
        results: [
          { lon: 13.40488, lat: 52.50176, formatted: "Berlin, Germany" },
        ],
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
    res = { locals: {} };
  });

  it("sends a request when given a 'from' location", async () => {
    await DistanceController.Calculate(req, res, () => {});

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        "https://api.geoapify.com/v1/geocode/search?text=London&format=json"
      )
    );
  });

  it("sends a request when given a 'to' location", async () => {
    await DistanceController.Calculate(req, res, () => {});

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        "https://api.geoapify.com/v1/geocode/search?text=Berlin&format=json"
      )
    );
  });

  it("add distance to req.query", async () => {
    await DistanceController.Calculate(req, res, () => {});

    expect(req.query.distance).toEqual(930.5084324079236);
  });

  it("check next has been called after distance calculated", async () => {
    const next = jest.fn(() => {});

    await DistanceController.Calculate(req, res, next);

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

  it("responds with 404 if results is empty", async () => {
    fetch.resetMocks();
    fetch.mockResponse(
      JSON.stringify({
        results: [],
      })
    );

    const json = jest.fn((object) => {});
    const res = {
      status: jest.fn((status) => {
        return { json: json };
      }),
    };
    const next = jest.fn(() => {});

    await DistanceController.Calculate(req, res, next);

    expect(res.status).toHaveBeenLastCalledWith(404);
    expect(json).toHaveBeenCalledWith({
      message: "Request returned no queries",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("adds formatted 'from' result to req.locals", async () => {
    await DistanceController.Calculate(req, res, () => {});

    expect(res.locals.from).toEqual("London, ENG, United Kingdom");
  });

  it("adds formatted 'to' result to req.locals", async () => {
    await DistanceController.Calculate(req, res, () => {});

    expect(res.locals.to).toEqual("Berlin, Germany");
  });
});
