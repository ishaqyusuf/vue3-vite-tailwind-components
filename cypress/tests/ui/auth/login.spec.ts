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
  // it("should login successfully", function () {
  //   cy.login(validEmail, "admin");
  //   cy.contains("Welcome back!");
  //   cy.contains("Sign In").should("not.exist");
  // });

  // it("reset password", () => {
  //   cy.login(fakeEmail, "admin");
  //   cy.contains("Invalid login details");
  //   cy.contains("Forgot your password?").click();

  //   cy.typeEmail(fakeEmail);
  //   cy.btnClick();
  //   cy.contains("Your input does not match any record");
  //   cy.typeEmail(validEmail);
  //   cy.contains(validEmail);
  //   cy.btnClick();

  //   cy.contains("We have sent you a verification email");
  //   cy.contains("check your email for instructions to reset your password");
  //   cy.get("button[id=resend]").click();
  //   cy.contains("We have sent you a verification email");
  //   ["01234", "12345"].map((k, i) => {
  //     cy.typee(k, "name=resetPin");
  //     cy.contains(k);
  //     cy.btnClick("button[id=resetBtn]");
  //     cy.contains(i == 0 ? "Invalid Token" : "New Password");
  //   });
  //   [
  //     {
  //       passwords: ["", ""],
  //       assert: "Enter valid password",
  //     },
  //     {
  //       password: ["abc", "abc"],
  //       assert: "Password too weak!",
  //     },
  //     {
  //       password: ["abc", "anc"],
  //       assert: "The password you enter does not match",
  //     },
  //     {
  //       password: ["Evolution20965", "Evolution20965"],
  //       assert: "The password you enter does not match",
  //     },
  //   ].map((test) => {
  //     cy.typee(test.password[0], "name=password");
  //     cy.typee(test.password[0], "name=confirm_password");
  //     cy.btnClick();
  //     cy.contains(test.assert);
  //   });
  // });
});
