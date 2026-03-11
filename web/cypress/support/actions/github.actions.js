Cypress.Commands.add('addGitHubProfile', (profileInsert) => {

    profileInsert.forEach(({ name, username, profile }) => {
        cy.contains('label', 'Nome')
            .parent()
            .find('input')
            .type(name)
            .should('have.value', name)

        cy.contains('label', 'Username do GitHub')
            .parent()
            .find('input')
            .type(username)
            .should('have.value', username)

        cy.contains('label', 'Perfil')
            .parent()
            .find('input')
            .type(profile)
            .should('have.value', profile)

        cy.contains('button', 'Adicionar Perfil')
            .should('be.visible')
            .click()
    })
})