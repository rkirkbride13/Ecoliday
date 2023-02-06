import EmissionResults from "./emissionResults";

describe("EmissionResults", () => {
  beforeEach(() => {
    cy.mount(
      <EmissionResults
        emissions={{
          plane: { total: 31.547396, perPassenger: 15.773698 },
          petrolCar: { total: 30.547396, perPassenger: 14.773698 },
          electricCar: { total: 29.547396, perPassenger: 13.773698 },
          train: { total: 28.547396, perPassenger: 12.773698 },
        }}
        renderEmissions={true}
      />
    );
  });

  it("Renders component with total emission result", () => {
    cy.get('[data-cy="total-emissions-plane"]').should(
      "contain.text",
      "31.5 kg"
    );
  });

  it("It doesn't render component when renderEmissions is false", () => {
    cy.mount(
      <EmissionResults
        emissions={{
          plane: { total: 31.547396, perPassenger: 15.773698 },
          petrolCar: { total: 30.547396, perPassenger: 14.773698 },
          electricCar: { total: 29.547396, perPassenger: 13.773698 },
          train: { total: 28.547396, perPassenger: 12.773698 },
        }}
        renderEmissions={false}
      />
    );

    cy.get('[data-cy="total-emissions-plane"]').should("not.exist");
  });

  it("Renders component with total emission plane, petrol car, electric car and train", () => {
    cy.get('[data-cy="total-emissions-plane"]').should(
      "contain.text",
      "31.5 kg"
    );
    cy.get('[data-cy="person-emissions-plane"]').should(
      "contain.text",
      "Per Person: 15.8 kg"
    );

    cy.get('[data-cy="total-emissions-petrol car"]').should(
      "contain.text",
      "30.5 kg"
    );
    cy.get('[data-cy="person-emissions-petrol car"]').should(
      "contain.text",
      "Per Person: 14.8 kg"
    );

    cy.get('[data-cy="total-emissions-electric car"]').should(
      "contain.text",
      "29.5 kg"
    );
    cy.get('[data-cy="person-emissions-electric car"]').should(
      "contain.text",
      "Per Person: 13.8 kg"
    );

    cy.get('[data-cy="total-emissions-train"]').should(
      "contain.text",
      "28.5 kg"
    );
    cy.get('[data-cy="person-emissions-train"]').should(
      "contain.text",
      "Per Person: 12.8 kg"
    );
  });

  describe("Save trip button", () => {
    it("renders save button on form when search true", () => {
      cy.get('[data-cy="saveButton"]')
        .invoke("attr", "type")
        .should("eq", "submit");
    });

    // it("can create a POST request to '/trips'", () => {
    //   cy.intercept("POST", "/trips", { message: "OK" }).as("saveTrip");

    //   cy.get('[data-cy="saveButton"]').click();

    //   cy.wait("@saveTrip").then((interception) => {
    //     expect(interception.response.body.message).to.eq("OK");
    //   });
    // });
  });
});

describe("Emission Context", () => {
  beforeEach(() => {
    cy.mount(
      <EmissionResults
        emissions={{
          plane: { total: 302.0, perPassenger: 150.0 },
          petrolCar: { total: 174.3, perPassenger: 87.2 },
          electricCar: { total: 50.3, perPassenger: 25.2 },
          train: { total: 8.9, perPassenger: 4.5 },
        }}
        renderEmissions={true}
      />
    );
  });

  it("doesnt render the emissions context drop-down results", () => {
    cy.mount(
      <EmissionResults
        emissions={{
          plane: { total: 302.0, perPassenger: 150.0 },
          petrolCar: { total: 174.3, perPassenger: 87.2 },
          electricCar: { total: 50.3, perPassenger: 25.2 },
          train: { total: 8.9, perPassenger: 4.5 },
        }}
        renderEmissions={false}
      />
    );
    cy.get('[data-cy="emissions-dropdown-plane"]').should("not.exist");
    cy.get('[data-cy="emissions-dropdown-petrol car"]').should("not.exist");
    cy.get('[data-cy="emissions-dropdown-electric car"]').should("not.exist");
    cy.get('[data-cy="emissions-dropdown-train"]').should("not.exist");
  });

  it("renders the emissions context for all methods of transport in a drop-down", () => {
    cy.get('[data-cy="emissions-dropdown-plane"]').should(
      "contain.text",
      "Eating 22 steaks"
    );
    cy.get('[data-cy="emissions-dropdown-petrol car"]').should(
      "contain.text",
      "Eating 13 steaks"
    );
    cy.get('[data-cy="emissions-dropdown-electric car"]').should(
      "contain.text",
      "Eating 4 steaks"
    );
    cy.get('[data-cy="emissions-dropdown-train"]').should(
      "contain.text",
      "Eating 1 steak"
    );
  });
});
