describe("User Login", function () {
  beforeEach(() => {});

  const login = (username, password, assert) => {
    cy.getBySelLike("username").clear().type(username);
    cy.getBySelLike("password").clear().type(password);

    cy.getBySelLike("submit").should("not.be.disabled");
    cy.getBySelLike("submit").click();
    cy.getBySelLike("submit").should("be.disabled");
    assert();
  };
  it("should login successfully", function () {
    login("ishaqyusuf024@gmail.com", "admin", () => {
      cy.contains("Login successfull");
    });
  });
  it("login should display correct error", () => {
    login("ishaqyusuf024@gmail.com", "admin12", () => {
      cy.contains("Password is incorrect");
    });
    login("ishaqyusuf024sakshajs@gmail.com", "admin12", () => {
      cy.contains("User with email not found on our database");
    });
  });
});
