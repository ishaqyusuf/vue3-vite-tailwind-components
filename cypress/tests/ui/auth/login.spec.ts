describe("User Login", function () {
  beforeEach(() => {});

  // const login = (username, password, assert) => {
  //   cy.visit("/login");
  //   cy.get("input[name=email]").clear().type(username);
  //   cy.get("input[name=password]").clear().type(password);
  //   const btn = "button[type=submit]";
  //   cy.get(btn).should("not.be.disabled");
  //   cy.get(btn).click();
  //   cy.get(btn).should("be.disabled");

  //   assert(cy);
  // };
  it("should login successfully", function () {
    cy.login("ishaqyusuf024@gmail.com", "admin");
    cy.contains("Hello World");
  });

  it("login should display correct error", () => {
    cy.login("ishaqyusuf024@gmail.com", "admin12");
    cy.contains("Password is incorrect");
    cy.login("ishaqyusuf024sakshajs@gmail.com", "admin12");
    cy.contains("User with email not found on our database");
  });
});
