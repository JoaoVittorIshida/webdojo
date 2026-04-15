describe('Expert', () => {

    beforeEach(() => {
        cy.start()
    })

    it('Deve manipular o valor de um campo', () => {

        cy.get('#email').invoke('val', 'teste@email.com')

        cy.get('#password').invoke('attr', 'name', 'senha')

        cy.contains('button', 'Entrar')
            .invoke('hide')
            .should('not.be.visible')

        cy.contains('button', 'Entrar')
            .invoke('show')
            .should('be.visible')

    })

    it('Não deve logar, senha inválida', () => {
        cy.submitLoginForm('papito@webdojo.com', 'senhaerrada')

        cy.get('[data-sonner-toaster=true]')
            .should('be.visible')
            .as('toast')

        cy.get('@toast')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.wait(5000)

        cy.get('@toast')
            .should('not.exist')
    })

    it('Simulando tecla TAB', () => {

        cy.get('body').press('Tab')
        cy.focused().should('have.attr', 'id', 'email')

        cy.get('#email').press('Tab')
        cy.focused().should('have.attr', 'id', 'password')

    })

    it('Pressionar tecla Enter', () => {

        cy.get('#email').type('papito@webdojo.com')
        cy.get('#password').type('senhaerrada{Enter}')
        

        cy.get('[data-sonner-toaster=true]')
            .should('be.visible')
            .as('toast')

        cy.get('@toast')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.wait(5000)

        cy.get('@toast')
            .should('not.exist')
    })
})