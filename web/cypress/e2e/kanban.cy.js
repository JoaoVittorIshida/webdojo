describe('Kanban Board', () => {

    it('Deve mover um card no quadro Kanban', () => {
        cy.Login()
        cy.goTo('Kanban', 'Kanban Board')

        const dataTransfer = new DataTransfer()

        //Puxar card de ToDo para Done
        cy.contains ('div[draggable=true]', 'Documentar API')
            .trigger('dragstart', { dataTransfer })

        cy.get ('.column-done')
            .trigger('drop', { dataTransfer })
            .find('h3')
            .should('have.text', 'Done (4)')

        cy.get ('.column-done')
            .should('include.text', 'Documentar API')
            .and('include.text', 'Criar documentação da API com Swagger')

        //Retornar card para ToDo
        cy.contains ('div[draggable=true]', 'Documentar API')
            .trigger('dragstart', { dataTransfer })

        cy.get ('.column-todo')
            .trigger('drop', { dataTransfer })
            .find('h3')
            .should('have.text', 'To Do (4)')

        cy.get ('.column-todo')
            .should('include.text', 'Documentar API')
            .and('include.text', 'Criar documentação da API com Swagger')

        
    })

})