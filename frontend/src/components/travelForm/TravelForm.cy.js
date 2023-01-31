import TravelForm from "./TravelForm";

describe("TravelForm", () => {
  beforeEach(() => {
    cy.mount(<TravelForm />);
  });

  it("has distance and no of people inputs and a submit buttom", () => {
    cy.get('[data-cy="distance"]');

    cy.get('[data-cy="passengers"]');

    cy.get('[data-cy="travelFormSubmit"]')
      .invoke("attr", "type")
      .should("eq", "submit");
  });

  it("user can type in the field", () => {
    cy.intercept("GET", "/emissions/plane?distance=1000&passengers=2").as(
      "emissionRequest"
    );

    cy.get('[data-cy="distance"]').type("1000");
    cy.get('[data-cy="passengers"]').type("2");
    cy.get('[data-cy="travelFormSubmit"]').click();

    cy.wait("@emissionRequest");
  });
});
