import { getFormattedTodayDate } from '../support/utils'

describe('Login', () => {

  it.only('Deve logar com sucesso', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

    cy.url().should('include', '/dashboard')

    cy.getCookie('login_date').should('exist')

    cy.getCookie('login_date').should((cookie) => {
      expect(cookie.value).to.eq(getFormattedTodayDate())
    })

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token')
      expect(token).to.exist
      expect(token).to.match(/^[a-fA-F0-9]{32}$/) // Verifica se o token tem formato de hash MD5
    })
  })

  it('Não deve logar, senha inválida', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'senhaerrada')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('Não deve logar, email não cadastrado', () => {
    cy.start()
    cy.submitLoginForm('emailerrado@email.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })
})