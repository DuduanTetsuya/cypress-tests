    it('Visit website', () => {
      cy.clearCookies();
      cy.visit('https://practice.expandtesting.com/login')
    })
    it('Login', () => {
      cy.get('#login > :nth-child(1) > :nth-child(1)').type('practice')
      cy.get('#password').type('SuperSecretPassword!')
      cy.get('#login > .btn').click()
      cy.contains('You logged into a secure area!').should('exist')
      //cy.get('.specific-element').should('contain.text', 'blablabla'); //specific elements

    })