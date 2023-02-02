import EmissionResults from "./emissionResults";

describe("EmissionResults", () => {
  it("Renders component with total emission result", () => {
    cy.mount(
      <EmissionResults
        emissions={{
          plane: { total: 31.547396, perPassenger: 31.547396 },
          petrolCar: { total: 31.547396, perPassenger: 15.81 },
        }}
        renderEmissions={true}
      />
    );

    cy.get('[data-cy="total-emissions"]').should("contain.text", "31.5 kg");
  });

  it("It doesn't render component when renderEmissions is false", () => {
    cy.mount(<EmissionResults emissions={""} renderEmissions={false} />);

    cy.get('[data-cy="total-emissions"]').should("not.exist");
  });

  it("Renders component with total emission and per person result based on one person", () => {
    cy.mount(
      <EmissionResults
        emissions={{
          plane: { total: 31.547396, perPassenger: 31.547396 },
          petrolCar: { total: 31.547396, perPassenger: 15.81 },
        }}
        renderEmissions={true}
      />
    );

    cy.get('[data-cy="total-emissions"]').should("contain.text", "31.5 kg");
    cy.get('[data-cy="person-emissions"]').should(
      "contain.text",
      "Per Person: 31.5 kg"
    );
  });

  it("Renders component with total emission and per person result based on two people", () => {
    cy.mount(
      <EmissionResults
        emissions={{
          plane: { total: 31.547396, perPassenger: 15.81 },
          petrolCar: { total: 31.547396, perPassenger: 15.81 },
        }}
        renderEmissions={true}
        passengers={2}
      />
    );

    cy.get('[data-cy="total-emissions"]').should("contain.text", "31.5 kg");
    cy.get('[data-cy="person-emissions"]').should(
      "contain.text",
      "Per Person: 15.8 kg"
    );
  });

  it("Renders component with total emission plane and petrol car", () => {
    cy.mount(
      <EmissionResults
        emissions={{
          plane: { total: 31.547396, perPassenger: 15.81 },
          petrolCar: { total: 31.547396, perPassenger: 15.81 },
        }}
        renderEmissions={true}
        passengers={2}
      />
    );

    cy.get('[data-cy="total-emissions"]').should("contain.text", "31.5 kg");
    cy.get('[data-cy="person-emissions"]').should(
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
