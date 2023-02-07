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

  let tripTwo = {
    to: "London, ENG, United Kingdom",
    from: "Berlin, Germany",
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

  describe("GET", () => {
    test("returns every trip for the user", async () => {
      await request(app).post("/trips").send(trip);
      await request(app).post("/trips").send(tripTwo);

      let response = await request(app)
        .get("/trips")
        .set({ user_id: "63e0ddcb06e90257776466a2" })
        .send();
      let trips = response.body.trips.map((trip) => trip.to);
      expect(trips).toEqual(["Berlin, Germany", "London, ENG, United Kingdom"]);
    });
  });

  describe("DELETE", () => {
    test("delete selected trip and update trips accordingly", async () => {
      await request(app).post("/trips").send(trip);
      let trips = await Trip.find();
      const trip_id = trips[0]._id;

      await request(app).post("/trips").send(tripTwo);

      let response = await request(app)
        .delete("/trips")
        .set({ trip_id: trip_id })
        .send();

      let updatedTrips = await Trip.find();
      expect(response.statusCode).toBe(200);
      expect(updatedTrips.length).toEqual(1);
    });
  });
});
