describe('Links abrindo nova guia/janela', () => {

  beforeEach(() => {
    cy.Login()
  })

  it('Validando o atributo do link do instagram', () => {

    cy.get('[data-cy="instagram-link"]')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
  })

  it('Acessa link de termos de uso removendo o target blanck', () => {
    
    cy.goTo('Formulários', 'Consultoria')
    
    cy.contains('a', 'termos de uso')
        .invoke('removeAttr', 'target')
        .click()

    cy.contains('h1', 'Termos de Uso')
        .should('be.visible')
        
  })
}) 