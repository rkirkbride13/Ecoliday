import Trip from "./trip";

let trip = {
  to: "New York",
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

describe("Trip", () => {
  it("renders with a trip", () => {
    cy.mount(<Trip trip={trip} />);
    cy.get('[data-cy="trip"]').should(
      "contain.text",
      "From:London, ENG, United KingdomTo:New YorkPassengers:2"
    );
  });
});
