import '../support/actions/github.actions'

describe('Gerenciamento de perfis no GitHub', () => {

    beforeEach(() => {
        cy.Login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    })

    it('Deve poder cadastrar um novo perfil do GitHub', () => {

        const githubProfiles = [
            {
                "name": "João Ishida",
                "username": "joaovittorishida",
                "profile": "QA"
            },
            {
                "name": "Maria Silva",
                "username": "mariasilva",
                "profile": "Developer"
            },
            {
                "name": "João Ishida",
                "username": "joaovittor2005",
                "profile": "QA"
            }
        ]

        cy.addGitHubProfile(githubProfiles)

        //Fazer validação na tabela, verificar linha buscando valor chave e depois fazendo sub validações

        githubProfiles.forEach(({ name, username, profile }) => {
            cy.contains('table tbody tr', username)
                .should('be.visible')
                .as('selectedRow')

            cy.get('@selectedRow')
                .contains('td', name)
                .should('be.visible')

            cy.get('@selectedRow')
                .contains('td', profile)
                .should('be.visible')
        })

    })

    it('Deve poder remover um perfil do GitHub', () => {

        
        const githubProfiles = [
            {
                "name": "João Ishida",
                "username": "joaovittorishida",
                "profile": "QA"
            },
            {
                "name": "Maria Silva",
                "username": "mariasilva",
                "profile": "Developer"
            },
            {
                "name": "João Ishida",
                "username": "joaovittor2005",
                "profile": "QA"
            }
        ]

        cy.addGitHubProfile(githubProfiles)

        cy.contains('table tbody tr', githubProfiles[1].username)
            .should('be.visible')
            .as('selectedRowToDelete')

        cy.get('@selectedRowToDelete')
            .find('button[title="Remover perfil"]')
            .click()

        cy.contains('table tbody', githubProfiles[1].username)
            .should('not.exist')

    })

    it('Deve validar o link do GitHub', () => {

        
        const githubProfiles = [
            {
                "name": "João Ishida",
                "username": "joaovittorishida",
                "profile": "QA"
            },
            {
                "name": "Maria Silva",
                "username": "mariasilva",
                "profile": "Developer"
            },
            {
                "name": "João Ishida",
                "username": "joaovittor2005",
                "profile": "QA"
            }
        ]

        cy.addGitHubProfile(githubProfiles)

        cy.contains('table tbody tr', githubProfiles[0].username)
            .should('be.visible')
            .as('selectedRowToOpenProfile')

        cy.get('@selectedRowToOpenProfile')
            .find('a')
            .should('have.attr', 'href', 'https://github.com/' + githubProfiles[0].username)
            .and('have.attr', 'target', '_blank')

        

    })

})