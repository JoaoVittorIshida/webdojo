describe('Cadastro', () => {

    beforeEach(() => {  
        cy.goToSignup()

        cy.intercept('POST', 'http://localhost:3333/api/users/register', {
            statusCode: 201,
            body: {
                message: "Usuário cadastrado com sucesso"
            }
        }).as('postSignup')
    })

    it('Deve cadastrar um novo usuário', () => {

        cy.get('#name').type('João Vitor')
        cy.get('#email').type('joaovittor@email.com')
        cy.get('#password').type('123123')
        cy.contains('button', 'Criar conta').click()

        cy.wait('@postSignup')

        cy.contains('Conta criada com sucesso!').should('be.visible')

    })





});