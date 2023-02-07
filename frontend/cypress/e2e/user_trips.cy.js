describe("Trips button", () => {
  before(() => {
    cy.signup("newuser200@email.com", "12345678");
  });
  it("redirects to the user trips page when logged in", () => {
    cy.session(["newuser200@email.com", "12345678"], () => {
      cy.request({
        method: "POST",
        url: "/tokens",
        body: { email: "newuser200@email.com", password: "12345678" },
      }).then(({ body }) => {
        window.localStorage.setItem("token", body.token);
      });
    });
    cy.visit("/");
    cy.get('[data-cy="navbar-trips"]').click();

    cy.url().should("include", "/trips");
  });

  it("when user not logged in the trips button not visible", () => {
    cy.visit("/");
    cy.get('[data-cy="navbar-trips"]').should("not.exist");
  });
});
