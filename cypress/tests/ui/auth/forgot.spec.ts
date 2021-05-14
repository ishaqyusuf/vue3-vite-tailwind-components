const fakeEmail = "ishaqyusuf024sakshajs@gmail.com";
const validEmail = "ishaqyusuf024@gmail.com";
it("reset password", () => {
  cy.goto("LOGIN");
  cy.contains("Forgot your password?").click();

  cy.typeEmail(fakeEmail);
  cy.clickBtnByName("resetBtn");
  cy.contains("Your input does not match any record");
  cy.typeEmail(validEmail);
  cy.clickBtnByName("resetBtn");

  // cy.contains("We have sent you a verification email");
  cy.contains("check your email for instructions to reset your password");
  cy.clickBtnByName("resend");
  cy.contains("check your email");
  ["01234", "12345"].map((k, i) => {
    cy.typee(k, "name=resetPin");
    cy.clickBtnByName("resetBtn");
    cy.contains(i == 0 ? "Invalid Token" : "New Password");
  });
  [
    {
      passwords: ["", ""],
      assert: "Enter valid password",
    },
    {
      passwords: ["abc", "abc"],
      assert: "Password too weak!",
    },
    {
      passwords: ["abc", "anc"],
      assert: "The password you enter does not match",
    },
    {
      passwords: ["Evolution20965", "Evolution20965"],
      assert: "Password Updated successfully!",
    },
  ].map((test) => {
    cy.typee(test.passwords[0], "name=password");
    cy.typee(test.passwords[1], "name=confirm_password");
    cy.clickBtnByName("submit");
    cy.contains(test.assert);
  });
});
