import EmissionResults from "./EmissionResults";

describe("EmissionResults", () => {
  it("Renders component with emission result", () => {
    cy.mount(<EmissionResults emissions={31.547396} renderEmissions={true} passengers={1}/>);

    cy.get('[data-cy="total-emissions"]').should('contain.text', "31.5 kg");
  })
})