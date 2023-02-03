import TravelForm from "./TravelForm";

describe("TravelForm", () => {
  beforeEach(() => {
    const setEmissionsMock = cy.stub();
    const setRenderEmissionsMock = cy.stub();
    const setToDisplayMock = cy.stub();
    const setFromDisplayMock = cy.stub();

    cy.mount(
      <TravelForm
        setEmissions={setEmissionsMock}
        setRenderEmissions={setRenderEmissionsMock}
        setToDisplay={setToDisplayMock}
        setFromDisplay={setFromDisplayMock}
      />
    );
  });

  it("has distance and no of people inputs and a submit buttom", () => {
    cy.get('[data-cy="from"]');
    cy.get('[data-cy="to"]');

    cy.get('[data-cy="passengers"]');

    cy.get('[data-cy="travelFormSubmit"]')
      .invoke("attr", "type")
      .should("eq", "submit");
  });

  it("request is sent when form is submitted with valid input values", () => {
    cy.intercept("GET", "/emissions?from=London&to=Berlin&passengers=2").as(
      "emissionRequest"
    );

    cy.get('[data-cy="from"]').type("London");
    cy.get('[data-cy="to"]').type("Berlin");
    cy.get('[data-cy="passengers"]').type("2");
    cy.get('[data-cy="travelFormSubmit"]').click();

    cy.wait("@emissionRequest");
  });
});
