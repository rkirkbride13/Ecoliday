describe("Siging in", () => {
  before(() => {
    cy.signup("newuser100@email.com", "12345678");
  });

  it("with valid credentials, redirects to '/' (frontend server must be running)", () => {
    cy.visit("/login");
    cy.get('[data-cy="login-email"]').type("newuser100@email.com");
    cy.get('[data-cy="login-password"]').type("12345678");
    cy.get('[data-cy="login-submit"]').click();

    cy.url().should("equal", "http://localhost:3000/");
  });

  describe("with incorrect user details", () => {
    it("has incorrect password", () => {
      cy.visit("/login");
      cy.get('[data-cy="login-email"]').type("newuser100@email.com");
      cy.get('[data-cy="login-password"]').type("password");
      cy.get('[data-cy="login-submit"]').click();

      cy.url().should("include", "/login");
    });

    it("has incorrect email", () => {
      cy.visit("/login");
      cy.get('[data-cy="login-email"]').type("user@email.com");
      cy.get('[data-cy="login-password"]').type("12345678");
      cy.get('[data-cy="login-submit"]').click();

      cy.url().should("include", "/login");
    });
  });
});
