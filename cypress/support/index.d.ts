declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    logout(): Chainable<Element>;
    createAccount(form): Chainable<Element>;
    login(email: string, password: string): Chainable<Element>;
  }
}
