describe('iFrame', () => {

    it('Deve tocar o video de exemplo no iFrame', () => {
        cy.Login()
        cy.goTo('Video', 'Video')

        cy.get('iframe[title="Video Player"]')
            .should('exist')
            .its('0.contentDocument.body')
            .then(cy.wrap)
            .as('iFramePlayer')

        cy.get('@iFramePlayer')
            .find('.play-button')
            .click()

        cy.get('@iFramePlayer')
            .find('.pause-button')
            .should('be.visible')
    })

})