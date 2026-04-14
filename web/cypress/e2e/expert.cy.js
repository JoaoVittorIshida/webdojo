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


})