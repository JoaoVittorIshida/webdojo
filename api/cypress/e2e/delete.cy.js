describe('DELETE /api/users/:id', () => {

    context('Remoção de usuário', () => {

        let userId

        const userDelete = {
            name: 'João Deletar',
            email: 'joao.deletar@teste.com',
            password: 'teste123'
        }

        before(() => {
            cy.task('deleteUser', userDelete.email)
            cy.postUser(userDelete).then((response) => {
                userId = response.body.user.id
            })
        })

        it('Deve remover um usuário existente', () => {

            cy.deleteUserById(userId).then((response) => {
                expect(response.status).to.equal(204)
            })

            cy.getUsers().then(response => {

                const found = response.body.find((user) => user.id === userId)
                expect(found).to.not.exist
            })
        })
    })


    context('ID não existe', () => {

        let userFailId

        const userToFail = {
            name: 'João Falha Exclusão',
            email: 'joaofalha@exclusao.com',
            password: 'teste123'
        }

        before(() => {

            cy.task('deleteUser', userToFail.email)
            cy.postUser(userToFail).then((response) => {
                userFailId = response.body.user.id
            })
        })

        it('Deve retornar 404 para usuário inexistente', () => {

            cy.deleteUserById(userFailId).then((response) => {
                expect(response.status).to.equal(204)
            })

            cy.deleteUserById(userFailId).then((response) => {
                expect(response.status).to.equal(404)
                expect(response.body.error).to.eq('User not found.')
            })
        })

    })





})
