/// <reference types="cypress" />

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

  it("reset password", () => {
    cy.login(fakeEmail, "admin");
    cy.contains("Invalid login details");
    cy.contains("Forgot your password?").click();

    cy.get("input[name=email]").clear().type(fakeEmail);
    cy.btnClick();
    cy.contains("Your input does not match any record");
    cy.get("input[name=email]").clear().type(validEmail);
    cy.btnClick();
    cy.contains("We have sent you a verification email");
  });
  // it("reset password");
});
