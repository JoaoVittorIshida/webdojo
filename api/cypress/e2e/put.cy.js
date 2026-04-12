describe('PUT /api/users/:id', () => {


    context('Atualização de usuário', () => {

        let userId
    const originalUser = {
        name: 'Joãozinho Original',
        email: 'joaozinho@original.com',
        password: 'teste123'
    }

    const updatedUser = {
        name: 'Joãozinho Atualizado',
        email: 'joaozinho@atualizado.com',
        password: 'teste456'
    }

    before(() => {
        cy.task('deleteUser', updatedUser.email)
        cy.task('deleteUser', originalUser.email)
        cy.postUser(originalUser).then((response) => {
            userId = response.body.user.id
        })
    })

    it('Deve atualizar um usuário existente', () => {

        cy.putUser(userId, updatedUser).then((response) => {
            expect(response.status).to.equal(204)
        })

        cy.getUsers().then(response => {

            const found = response.body.find((user) => user.id === userId)
            expect(found).to.exist
            expect(found.name).to.eq(updatedUser.name)
            expect(found.email).to.eq(updatedUser.email)
        })

    })
    })

    context('Campos obrigatórios', () => {

        it('Campo name é obrigatório', () => {

            const user = {
                email: 'joao@teste.com',
                password: 'teste123'

            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.error).to.eq('Name is required.')

            })
        })

        it('Campo email é obrigatório', () => {

            const user = {
                name: 'João Vittor',
                password: 'teste123'

            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.error).to.eq('Email is required.')

            })
        })

        it('Campo senha é obrigatório', () => {

            const user = {
                name: 'João Vittor',
                email: 'joao@teste.com'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.error).to.eq('Password is required.')

            })
        })

        it('Erro de formato JSON inválido', () => {

            const userString = `{
                "name": "João Vittor",
                "email": "joao@teste.com"    
                "password": "teste123"
                    }` // JSON malformado de propósito, falta virgula

            cy.putUser(1, userString).then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.error).to.eq('Invalid JSON format.')

            })
        })

    })

    context('ID não existe', () => {

        let userFailId

        const newUser = {
            name: 'João Criado',
            email: 'joaocriado@criado.com',
            password: 'teste123'
        }

        const updatedUserFail = {
            name: 'João Falha Atualização',
            email: 'joaofalha@atualizacao.com',
            password: 'teste123'
        }

        before(() => {

            cy.task('deleteUser', newUser.email)
            cy.task('deleteUser', updatedUserFail.email)

            cy.postUser(newUser).then((response) => {
                userFailId = response.body.user.id
            })

            cy.task('deleteUser', newUser.email)
        })

        it('Deve retornar 404 para usuário inexistente', () => {

            cy.putUser(userFailId, updatedUserFail).then((response) => {
                expect(response.status).to.equal(404)
                expect(response.body.error).to.eq('User not found.')
            })

        })

    })



})