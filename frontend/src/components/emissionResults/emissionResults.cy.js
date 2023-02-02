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
    cy.mount(<EmissionResults emissions={{
      plane: { total: 31.547396, perPassenger: 15.773698 },
      petrolCar: { total: 30.547396, perPassenger: 14.773698 },
      electricCar: { total: 29.547396, perPassenger: 13.773698 },
      train: { total: 28.547396, perPassenger: 12.773698 },
    }} renderEmissions={false} />);

    cy.get('[data-cy="total-emissions-plane"]').should("not.exist");
  });

  it("Renders component with total emission and per person result based on two people", () => {
    cy.get('[data-cy="total-emissions-plane"]').should(
      "contain.text",
      "31.5 kg"
    );
    cy.get('[data-cy="person-emissions-plane"]').should(
      "contain.text",
      "Per Person: 15.8 kg"
    );
  });

  it("Renders component with total emission plane and petrol car", () => {
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
  });

  it("Renders component with total emission plane, petrol car and electric car", () => {
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
});
