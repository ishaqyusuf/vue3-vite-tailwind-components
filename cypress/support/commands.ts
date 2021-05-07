// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import { curryRight } from "cypress/types/lodash";

// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get("input[name=email]").clear().type(email);
  cy.get("input[name=password]").clear().type(password);
  const btn = "button[id=submit]";
  cy.get(btn).should("not.be.disabled");
  cy.get(btn).click();
  cy.get(btn).should("be.disabled");
});
Cypress.Commands.add("logout", () => {
  cy.contains("Login").should("not.exist");
  cy.get(".avatar").click();
  cy.contains("Logout").click();
});
Cypress.Commands.add("createAccount", (form) => {
  cy.visit("/register");
  ["first_name", "last_name", "email", "password"].map((e) =>
    cy.get(`input[name=${e}]`).clear().type(form[e])
  );
  const btn = "button[id=submit]";
  cy.get(btn).should("not.be.disabled");
  cy.get(btn).click();
  cy.get(btn).should("be.disabled");
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
