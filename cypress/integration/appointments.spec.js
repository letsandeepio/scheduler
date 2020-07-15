/* eslint-disable no-undef */
describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Monday');
  });

  it('should book an interview', () => {
    cy.get('[alt="Add"]').first().click();

    cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones');

    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains('Save').click();

    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
    cy.request('GET', '/api/debug/reset');
  });

  it('should edit an interview', () => {
    cy.get('[alt="Edit"]').first().click({ force: true });

    cy.get('[data-testid=student-name-input]')
      .clear()
      .type('Sandeep Kumar Chopra');

    cy.get("[alt='Tori Malcolm']").click();

    cy.contains('Save').click();

    cy.contains('.appointment__card--show', 'Sandeep Kumar Chopra');
    cy.contains('.appointment__card--show', 'Tori Malcolm');
    cy.request('GET', '/api/debug/reset');
  });

  it('should delete an interview', () => {
    cy.get('[alt="Delete"]').first().click({ force: true });
    cy.contains('Confirm').click();
    cy.contains('Deleting').should('exist');
    cy.contains('Deleting').should('not.exist');

    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
  });
});
