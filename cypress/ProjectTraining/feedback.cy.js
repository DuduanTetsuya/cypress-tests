it('Visit website', () => {
    cy.visit('https://www.jotform.com/form-templates/preview/21022509285447/classic&nofs&defer=false&disableSmartEmbed=1');
    cy.get('#label_input_3_0').click();
    cy.get('#input_4').type('Hello World, my name is Febri');
    cy.get('#first_8').type('Duanestra');
    cy.get('#last_8').type('Febri');
    cy.get('#input_6').type('duanestra@gmail.com');
    cy.get('#input_9').click();
    cy.contains('p', 'Your submission has been received').should('be.visible');
    cy.url().should('include', 'thank-you');
})