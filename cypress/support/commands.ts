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
/// <reference types="cypress" />
import { curryRight } from "cypress/types/lodash";

Cypress.Commands.add("typee", (value, element) => {
  const selector = `input[${element}]`;
  cy.get(selector).clear().type(value);
  // cy.get(selector).contains(value);
});
Cypress.Commands.add("typeEmail", (value) => {
  cy.typee(value, "name=email");
});
Cypress.Commands.add("btnClick", (btn, checkDisable = false) => {
  checkDisable && cy.get(btn).should("not.be.disabled");
  cy.get(btn).click();
  checkDisable && cy.get(btn).should("be.disabled");
});
Cypress.Commands.add("clickBtnById", (id, checkDisable = false) => {
  cy.btnClick(`button[id='${id}']`, checkDisable);
});
Cypress.Commands.add("clickBtnByName", (name, checkDisable = false) => {
  cy.btnClick(`button[name='${name}']`, checkDisable);
});
Cypress.Commands.add("clickByBtnType", (name, checkDisable = false) => {
  cy.btnClick(`button[type='${name}']`, checkDisable);
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
