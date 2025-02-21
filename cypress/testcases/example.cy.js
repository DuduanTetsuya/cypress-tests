describe('Example', () => {
  it('Open URL', () => {
    cy.visit('https://example.cypress.io')
  })
  it('Title', () => {
    cy.get('h1').should('have.text', 'Kitchen Sink')
  })
})