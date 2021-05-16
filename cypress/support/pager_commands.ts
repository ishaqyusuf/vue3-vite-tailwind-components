const pages = {
  LOGIN: "/sign-in",
  REGISTER: "/register",
  HOME: "/",
  TRACKING: "/tracking",
};
Cypress.Commands.add("goto", (page = "HOME", params = {}) => {
  cy.visit(pages[page]);
});
