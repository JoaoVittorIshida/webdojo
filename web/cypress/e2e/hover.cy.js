describe('Simulando Mouseover', () => {
  it('Deve exibir o tooltip ao passar o mouse', () => {
    cy.Login()

    cy.contains('Isso é Mouseover!').should('not.exist')
    cy.get('[data-cy="instagram-link"]').trigger('mouseover')
    cy.contains('Isso é Mouseover!').should('exist')
  })
})