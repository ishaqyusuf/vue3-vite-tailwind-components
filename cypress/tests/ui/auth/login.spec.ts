// / <reference types="cypress" />

describe("User Login", function () {
  beforeEach(() => {});
  const fakeEmail = "ishaqyusuf024sakshajs@gmail.com";
  const validEmail = "ishaqyusuf024@gmail.com";
  it("login should display correct error", () => {
    cy.login(fakeEmail, "admin");
    cy.contains("Invalid login details");
    // cy.contains("User with email not found on our database");
  });
  it("should login successfully", function () {
    cy.login(validEmail, "admin");
    cy.contains("Welcome back!");
    cy.contains("Sign In").should("not.exist");
  });
  it("logout", function () {
    cy.logout();
  });
});
