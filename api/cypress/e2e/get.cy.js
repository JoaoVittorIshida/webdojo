describe('GET /api/users', () => {

    const userMass = [
        {
            name: 'Joãozinho 1',
            email: 'joaozinho1@teste.com',
            password: 'teste123'
        },
        {
            name: 'Joãozinho 2',
            email: 'joaozinho2@teste.com',
            password: 'teste123'
        },
        {
            name: 'Joãozinho 3',
            email: 'joaozinho3@teste.com',
            password: 'teste123'
        },
        {
            name: 'Joãozinho 4',
            email: 'joaozinho4@teste.com',
            password: 'teste123'
        },
        {
            name: 'Joãozinho 5',
            email: 'joaozinho5@teste.com',
            password: 'teste123'
        },
    ]

    before(() => {
        userMass.forEach(userTest => {
            cy.postUser(userTest)
        })
    })


    it('Deve retornar uma lista de usuários', () => {

        cy.getUsers().then(response => {

            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')

            userMass.forEach(userTest => {
                const found = response.body.find((user) => user.email === userTest.email)
                expect(found).to.exist
                expect(found.name).to.eq(userTest.name)
                expect(found.email).to.eq(userTest.email)
                expect(found).to.not.have.property('password')
                expect(found).to.have.property('id')
            })
        })




    })

    after(() => {
        userMass.forEach(userTest => {
            cy.task('deleteUser', userTest.email)
        })
    })













})