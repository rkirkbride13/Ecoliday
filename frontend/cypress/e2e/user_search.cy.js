describe("User emission search", () => {
  beforeEach(() => {
    cy.intercept("GET", "/emissions?distance=1000&passengers=2", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          emissions: {
            plane: { total: 31.547396, perPassenger: 15.773698 },
            petrolCar: { total: 31.547396, perPassenger: 15.773698 },
            electricCar: { total: 31.547396, perPassenger: 15.773698 },
            train: { total: 31.547396, perPassenger: 15.773698 },
          },
        },
      });
    }).as("getEmissions");
  });

  it("user sucessfully completes a search and renders plane results on the page", () => {
    cy.visit("/");
    cy.get('[data-cy="distance"]').type("1000");
    cy.get('[data-cy="passengers"]').type("2");
    cy.get('[data-cy="travelFormSubmit"]').click();

    cy.wait("@getEmissions").then(() => {
      cy.get('[data-cy="total-emissions-plane"]').should(
        "contain.text",
        "31.5 kg"
      );
      cy.get('[data-cy="person-emissions-plane"]').should(
        "contain.text",
        "Per Person: 15.8 kg"
      );
    });
  });

  it("user sucessfully completes a search and renders plane and petrol car results on the page", () => {
    cy.visit("/");
    cy.get('[data-cy="distance"]').type("1000");
    cy.get('[data-cy="passengers"]').type("2");
    cy.get('[data-cy="travelFormSubmit"]').click();

    cy.wait("@getEmissions").then(() => {
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

  it("user sucessfully completes a search and renders plane, petrol car and electric car results on the page", () => {
    cy.visit("/");
    cy.get('[data-cy="distance"]').type("1000");
    cy.get('[data-cy="passengers"]').type("2");
    cy.get('[data-cy="travelFormSubmit"]').click();

    cy.wait("@getEmissions").then(() => {
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
      cy.get('[data-cy="total-emissions-electricCar"]').should(
        "contain.text",
        "31.5 kg"
      );
      cy.get('[data-cy="person-emissions-electricCar"]').should(
        "contain.text",
        "Per Person: 15.8 kg"
      );
    });
  });

  xit("user sucessfully completes a search and renders plane, petrol car, electric car and train results on the page", () => {
    cy.visit("/");
    cy.get('[data-cy="distance"]').type("1000");
    cy.get('[data-cy="passengers"]').type("2");
    cy.get('[data-cy="travelFormSubmit"]').click();

    cy.wait("@getEmissions").then(() => {
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
      cy.get('[data-cy="total-emissions-electricCar"]').should(
        "contain.text",
        "31.5 kg"
      );
      cy.get('[data-cy="person-emissions-electricCar"]').should(
        "contain.text",
        "Per Person: 15.8 kg"
      );
      cy.get('[data-cy="total-emissions-train"]').should(
        "contain.text",
        "31.5 kg"
      );
      cy.get('[data-cy="person-emissions-train"]').should(
        "contain.text",
        "Per Person: 15.8 kg"
      );
    });
  });
});
