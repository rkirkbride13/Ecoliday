const Trip = require("../../models/trips");
const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");

describe("/trips", () => {
  let trip = {
    to: "Berlin, Germany",
    from: "London, ENG, United Kingdom",
    user_id: "63e0ddcb06e90257776466a2",
    passengers: "2",
    emissions: {
      plane: { total: 31.547396, perPassenger: 15.773698 },
      petrolCar: { total: 30.547396, perPassenger: 14.773698 },
      electricCar: { total: 29.547396, perPassenger: 13.773698 },
      train: { total: 28.547396, perPassenger: 12.773698 },
    },
  };

  beforeAll(async () => {
    await User.deleteMany({});
    await Trip.deleteMany({});
    const user = new User({
      email: "test@email.com",
      password: "password",
    });
    await user.save();
  });

  beforeEach(async () => {
    await Trip.deleteMany({});
  });

  describe("POST", () => {
    test("responds with a status code 201", async () => {
      let response = await request(app).post("/trips").send(trip);

      expect(response.status).toEqual(201);
    });

    test("a new trip is created", async () => {
      await request(app).post("/trips").send(trip);
      let trips = await Trip.find();
      expect(trips.length).toEqual(1);
      expect(trips[0].to).toEqual("Berlin, Germany");
      expect(trips[0].from).toEqual("London, ENG, United Kingdom");
    });
  });
});
