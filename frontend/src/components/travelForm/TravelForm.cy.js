import TravelForm from "./TravelForm";

describe("TravelForm", () => {
  beforeEach(() => {
    const setPassengersMock = cy.stub();
    const setDistanceMock = cy.stub();
    const setEmissionsMock = cy.stub();
    const setRenderEmissionsMock = cy.stub();

    cy.mount(<TravelForm 
      distance={1000}
      setDistance={setDistanceMock}
      passengers={2}
      setPassengers={setPassengersMock}
      setEmissions={setEmissionsMock}
      setRenderEmissions={setRenderEmissionsMock}
    />);
  });

  it("has distance and no of people inputs and a submit buttom", () => {
    cy.get('[data-cy="distance"]');

    cy.get('[data-cy="passengers"]');

    cy.get('[data-cy="travelFormSubmit"]')
      .invoke("attr", "type")
      .should("eq", "submit");
  });

  it("request is sent when form is submitted", () => {
    cy.intercept("GET", "/emissions?distance=1000&passengers=2").as(
      "emissionRequest"
    );

    cy.get('[data-cy="travelFormSubmit"]').click();

    cy.wait("@emissionRequest");
  });

  it("user can type in input fields", () => {
    cy.get('[data-cy="distance"]').type("1000");
    cy.get('[data-cy="passengers"]').type("2");
  });

});
