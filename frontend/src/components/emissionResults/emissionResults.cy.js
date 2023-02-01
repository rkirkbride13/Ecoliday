import EmissionResults from "./EmissionResults";

describe("EmissionResults", () => {
  it("Renders component with total emission result", () => {
    cy.mount(
      <EmissionResults
        emissions={31.547396}
        renderEmissions={true}
        passengers={1}
      />
    );

    cy.get('[data-cy="total-emissions"]').should("contain.text", "31.5 kg");
  });

  it("It doesn't render component when renderEmissions is false", () => {
    cy.mount(
      <EmissionResults emissions={""} renderEmissions={false} passengers={""} />
    );

    cy.get('[data-cy="total-emissions"]').should("not.exist");
  });

  it("Renders component with total emission and per person result based on one person", () => {
    cy.mount(
      <EmissionResults
        emissions={31.547396}
        renderEmissions={true}
        passengers={1}
      />
    );

    cy.get('[data-cy="total-emissions"]').should("contain.text", "31.5 kg");
    cy.get('[data-cy="person-emissions"]').should("contain.text", "31.5 kg");
  });

  it("Renders component with total emission and per person result based on two people", () => {
    cy.mount(
      <EmissionResults
        emissions={31.547396}
        renderEmissions={true}
        passengers={2}
      />
    );

    cy.get('[data-cy="total-emissions"]').should("contain.text", "31.5 kg");
    cy.get('[data-cy="person-emissions"]').should("contain.text", "15.8 kg");
  });
});
