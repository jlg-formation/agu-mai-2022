describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Gestion Stock');
    cy.get('button').contains('Voir le stock').click();
    cy.get('[aria-label="Ajouter"]').click();
  });
});
