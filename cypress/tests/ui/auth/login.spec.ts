/// <reference types="cypress" />

describe("User Login", function () {
  beforeEach(() => {});

  it("should login successfully", function () {
    cy.login("ishaqyusuf024@gmail.com", "admin");
    cy.contains("Sign In");
  });

  it("login should display correct error", () => {
    cy.login("ishaqyusuf024sakshajs@gmail.com", "admin12");
    cy.contains("Password is incorrect");
    cy.contains("User with email not found on our database");
  });
});
