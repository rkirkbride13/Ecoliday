describe("User emission search", () => {
  it("user sucessfully completes a search and renders results on the page", () => {
    cy.intercept("GET", "/emissions?distance=1000&passengers=1", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          emissions: {
            plane: { total: 31.547396, perPassenger: 31.547396 },
            petrolCar: { total: 31.547396, perPassenger: 15.81 },
          },
        },
      });
    }).as("getEmissions");

    cy.visit("/");
    cy.get('[data-cy="distance"]').type("1000");
    cy.get('[data-cy="passengers"]').type("1");
    cy.get('[data-cy="travelFormSubmit"]').click();

    cy.wait("@getEmissions").then(() => {
      cy.get('[data-cy="total-emissions"]').should("contain.text", "31.5 kg");
      cy.get('[data-cy="person-emissions"]').should(
        "contain.text",
        "Per Person: 31.5 kg"
      );
    });
  });
});
