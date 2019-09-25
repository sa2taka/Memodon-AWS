describe('App', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'Memodon');
  });

  it('become dark mode and keep it', () => {
    cy.visit('/');
    cy.get('div.v-application').should('have.class', 'theme--light');
    cy.get('div.v-input.center-switch').click();
    cy.get('div.v-application').should('have.class', 'theme--dark');

    cy.visit('/');
    cy.get('div.v-application').should('have.class', 'theme--dark');
  });
});
