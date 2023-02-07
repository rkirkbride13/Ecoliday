import UserTrips from "./userTrips";

describe("UserTrips", () => {
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
    to: "Manchester, ENG, United Kingdom",
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

  it("lists trips for the user on the page", () => {
    cy.intercept("GET", "/trips", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          trips: [trip, tripTwo],
        },
      });
    }).as("getTrips");

    cy.mount(<UserTrips />);

    cy.wait("@getTrips").then(() => {
      cy.get('[data-cy="trips"]')
        .should(
          "contain.text",
          "London, ENG, United Kingdom to Berlin, Germany with 2 passengers"
        )
        .and(
          "contain.text",
          "Berlin, Germany to Manchester, ENG, United Kingdom with 2 passengers"
        )
        .and("contain.text", "31.5")
        .and("contain.text", "30.5")
        .and("contain.text", "29.5")
        .and("contain.text", "28.5");
    });
  });
});
