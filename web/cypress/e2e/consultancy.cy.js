import { personal, company } from '../fixtures/consultancy.json'
import '../support/actions/consultancy.actions'

describe('Formulário de Consultoria', () => {

    beforeEach(() => {
        cy.Login()
        cy.goTo('Formulários', 'Consultoria')
    })

    it('Deve solicitar individual', () => {
        cy.fillConsultancyForm(personal)
        cy.submitConsultancyForm()
        cy.validateConsultancyModal()
    })

    it('Deve solicitar In Company', () => {
        cy.fillConsultancyForm(company)
        cy.submitConsultancyForm()
        cy.validateConsultancyModal()
    })

    it('Deve verificar campos obrigatórios', () => {
        cy.submitConsultancyForm()

        const requiredField = [
            {label: 'Nome Completo', message: 'Campo obrigatório'},
            {label: 'Email', message: 'Campo obrigatório'},
            {label: 'termos de uso', message: 'Você precisa aceitar os termos de uso'}
        ]

        //Validar se campos obrigatórios estão com a mensagem de erro

        requiredField.forEach(({label, message}) => {
            cy.contains('label', label)
            .parent()
            .find('p', message)
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)') //verificação extra
        });

    })
})