const pages = {
  LOGIN: "/sign-in",
  REGISTER: "/register",
  HOME: "/",
};
Cypress.Commands.add("goto", (page = "HOME", params = {}) => {
  cy.visit(pages[page]);
});
