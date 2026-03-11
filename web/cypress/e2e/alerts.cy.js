describe('Validações de Alertas em JavaScript', () => {

    beforeEach(() => {
        cy.Login()
        cy.goTo('Alertas JS', 'JavaScript Alerts')
    })

    it('Deve validar a mensagem de alerta', () => {

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou um Alert Box!')
        })

        cy.contains('button', 'Mostrar Alert').click()

    })

    it('Deve confirmar um diálogo e validar a resposta positiva', () => {

        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return true //Simula botão OK
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm').click()

    })

    it('Deve cancelar um diálogo e validar a resposta negativa', () => {

        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return false //Simula botão Cancelar
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()

    })

    it('Deve interar com um prompt, inserir um texto e validar uma mensagem', () => {

        const nome = 'João'
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns(nome)
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá ' + nome + '! Boas-vindas ao WebDojo!')
        })

        cy.contains('button', 'Mostrar Prompt').click()
    })
})