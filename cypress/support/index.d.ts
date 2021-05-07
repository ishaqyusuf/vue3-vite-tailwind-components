declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    logout(): Chainable<Element>;
    createAccount(form): Chainable<Element>;
    login(email: string, password: string): Chainable<Element>;
    btnClick(btn?: string): Chainable<Element>;
    typee(value: string, selector?: string): Chainable<Element>;
    typeEmail(value: string): Chainable<Element>;
  }
}
