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

    cy.get('[data-cy="total-emissions"]').should(
      "contain.text",
      "CO2e (Total): 31.5 kg"
    );
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

    cy.get('[data-cy="total-emissions"]').should(
      "contain.text",
      "CO2e (Total): 31.5 kg"
    );
    cy.get('[data-cy="person-emissions"]').should(
      "contain.text",
      "CO2e (Per Person): 31.5 kg"
    );
  });

  it("Renders component with total emission and per person result based on two people", () => {
    cy.mount(
      <EmissionResults
        emissions={31.547396}
        renderEmissions={true}
        passengers={2}
      />
    );

    cy.get('[data-cy="total-emissions"]').should(
      "contain.text",
      "CO2e (Total): 31.5 kg"
    );
    cy.get('[data-cy="person-emissions"]').should(
      "contain.text",
      "CO2e (Per Person): 15.8 kg"
    );
  });
  it("Renders title component with km information", () => {
    cy.mount(
      <EmissionResults
        emissions={31.547396}
        renderEmissions={true}
        passengers={2}
        distance={100}
      />
    );

    cy.get('[data-cy="header-emissions"]').should(
      "contain.text",
      "Emissions for 100 km"
    );
  });
});
