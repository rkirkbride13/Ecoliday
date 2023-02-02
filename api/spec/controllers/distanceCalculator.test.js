const DistanceController = require("../../controllers/distance");
require("jest-fetch-mock").enableMocks();

describe("DistanceController", () => {
  let req;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(
      JSON.stringify({ longt: "-0.11534", latt: "51.51413" })
    );
    fetch.mockResponseOnce(
      JSON.stringify({ longt: "13.40488", latt: "52.50176" })
    );
    req = {
      query: {
        to: "Berlin",
        from: "London",
        passengers: "2",
      },
    };
  });

  it("sends a request when given a 'from' location", async () => {
    await DistanceController.Calculate(req, {}, () => {});

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://geocode.xyz?locate=London&json=1")
    );
  });

  it("sends a request when given a 'to' location", async () => {
    await DistanceController.Calculate(req, {}, () => {});

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://geocode.xyz?locate=Berlin&json=1")
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
});
