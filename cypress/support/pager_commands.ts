const pages = {
  login: "/sign-in",
  register: "/register",
};
Cypress.Commands.add("goto", (page: "LOGIN | REGISTER", params = {}) => {
  cy.visit(pages[page]);
});
