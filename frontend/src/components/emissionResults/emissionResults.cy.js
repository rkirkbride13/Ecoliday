import EmissionResults from "./emissionResults";

describe("EmissionResults", () => {
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
        fromDisplay={"London, ENG, United Kingdom"}
        toDisplay={"Berlin, Germany"}
        passengers={"2"}
      />
    );
  });

  it("Renders component with total emission result", () => {
    cy.get('[data-cy="total-emissions-plane"]').should(
      "contain.text",
      "302.0 kg"
    );
  });

  it("It doesn't render component when renderEmissions is false", () => {
    cy.mount(<EmissionResults renderEmissions={false} />);

    cy.get('[data-cy="total-emissions-plane"]').should("not.exist");
  });

  it("Renders component with total emission plane, petrol car, electric car and train", () => {
    cy.get('[data-cy="total-emissions-plane"]').should(
      "contain.text",
      "302.0 kg"
    );
    cy.get('[data-cy="person-emissions-plane"]').should(
      "contain.text",
      "Per Person: 150.0 kg"
    );

    cy.get('[data-cy="total-emissions-petrol car"]').should(
      "contain.text",
      "174.3 kg"
    );
    cy.get('[data-cy="person-emissions-petrol car"]').should(
      "contain.text",
      "Per Person: 87.2 kg"
    );

    cy.get('[data-cy="total-emissions-electric car"]').should(
      "contain.text",
      "50.3 kg"
    );
    cy.get('[data-cy="person-emissions-electric car"]').should(
      "contain.text",
      "Per Person: 25.2 kg"
    );

    cy.get('[data-cy="total-emissions-train"]').should(
      "contain.text",
      "8.9 kg"
    );
    cy.get('[data-cy="person-emissions-train"]').should(
      "contain.text",
      "Per Person: 4.5 kg"
    );
  });

  describe("Save trip button", () => {
    it("renders save button on form when search true", () => {
      cy.get('[data-cy="saveButton"]')
        .invoke("attr", "type")
        .should("eq", "submit");
    });

    it("can create a POST request to '/trips'", (done) => {
      cy.intercept("POST", "/trips", { message: "OK" }).as("saveTrip");

      cy.get('[data-cy="saveButton"]').click();

      cy.wait("@saveTrip").then((interception) => {
        expect(interception.response.body.message).to.eq("OK");
      });
      done();
    });
  });

  describe("Emission Context", () => {
    it("doesnt render the emissions context drop-down results", () => {
      cy.mount(<EmissionResults renderEmissions={false} />);
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
});
