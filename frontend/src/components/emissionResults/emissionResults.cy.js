import EmissionResults from "./emissionResults";

describe("EmissionResults", () => {
  beforeEach(() => {
    cy.mount(
      <EmissionResults
        emissions={{
          plane: { total: 31.547396, perPassenger: 15.81 },
          petrolCar: { total: 31.547396, perPassenger: 15.81 },
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
    cy.mount(<EmissionResults emissions={""} renderEmissions={false} />);

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

    cy.get('[data-cy="total-emissions-petrolCar"]').should(
      "contain.text",
      "31.5 kg"
    );
    cy.get('[data-cy="person-emissions-petrolCar"]').should(
      "contain.text",
      "Per Person: 15.8 kg"
    );
  });
});
