/// <reference types="cypress" />

describe("User Login", function () {
  beforeEach(() => {});

  it("should login successfully", function () {
    cy.login("ishaqyusuf024@gmail.com", "admin");
    cy.contains("Welcome back!");
    cy.contains("Sign In").should("not.exist");
  });

  it("login should display correct error", () => {
    cy.login("ishaqyusuf024sakshajs@gmail.com", "admin12");
    cy.contains("Invalid login details");
    // cy.contains("User with email not found on our database");
  });
  // it("reset password");
});
