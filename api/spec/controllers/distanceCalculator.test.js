const DistanceController = require("../../controllers/distance");
require("jest-fetch-mock").enableMocks();

describe("DistanceController", () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponse("{}");
  });

  it("sends a request when given a 'from' location", async () => {
    const req = {
      query: {
        to: "Berlin",
        from: "London",
        passengers: "2",
      },
    };

    await DistanceController.Calculate(req, {}, () => {});

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://geocode.xyz?locate=London&json=1")
    );
  });

  it("sends a request when given a 'to' location", async () => {
    const req = {
      query: {
        to: "Berlin",
        from: "London",
        passengers: "2",
      },
    };

    await DistanceController.Calculate(req, {}, () => {});

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://geocode.xyz?locate=Berlin&json=1")
    );
  });
});
