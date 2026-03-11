Cypress.Commands.add('fillConsultancyForm', (form) => {
    cy.get('input[placeholder="Digite seu nome completo"').type(form.fullName)

    cy.get('input[placeholder="Digite seu email"').type(form.email)

    cy.get('input[placeholder="(00) 00000-0000"')
        .type(form.phone)
    //.should('have.value', '(11) 99999-9999')

    //Selectpickers
    cy.contains('label', 'Tipo de Consultoria')
        .parent()
        .find('select')
        .select(form.consultancyType)

    //Radio buttons para tipo de pessoa
    if (form.personType === 'cpf') {
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .check()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('not.be.checked')
    }
    if (form.personType === 'cnpj') {
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .check()
            .should('be.checked')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('not.be.checked')
    }


    //Preenchimento do documento
    if (form.personType === 'cpf') {
        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(form.document)
        //.should('have.value', '268.673.030-72')
    }

    if (form.personType === 'cnpj') {
        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(form.document)
        //.should('have.value', '51.463.645/0001-00')
    }



    //Check em todos os campos, tipo 1 de for
    for (let checkchannel of form.discoveryChannels) {
        cy.contains('label', checkchannel)
            .find('input')
            .check()
            .should('be.checked')
    }

    //Uncheck em todos os campos, tipo 2 de for
    form.discoveryChannels.forEach(uncheckchannel => {
        cy.contains('label', uncheckchannel)
            .find('input')
            .uncheck()
            .should('not.be.checked')
    })

    //Check em apenas 1 campo para continuar
    cy.contains('label', form.discoveryChannels[0])
        .find('input')
        .check()
        .should('be.checked')

    //Upload de arquivo        
    cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile(form.filePath, { force: true })

    //Text Area
    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"')
        .type(form.details)
        .should('have.value', form.details)

    //Campo com tags    

    form.techs.forEach(tech => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"')
            .type(tech)
            .type('{enter}')
        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', tech)
            .should('be.visible')
    })

    if (form.terms == true) {
        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
            .should('be.checked')
    }
})

Cypress.Commands.add('submitConsultancyForm', () => {
    cy.contains('button', 'Enviar formulário')
        .click()
})

Cypress.Commands.add('validateConsultancyModal', () => {
    cy.get('.modal', { timeout: 7000 })
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
})