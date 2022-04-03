describe('Current Weather test', () => {
    it('checks the Current Weather box contents and toggles the details', () => {
        cy.visit('/')
        cy.get('.weather-current').should('exist')
        cy.get('.weather-current__location').contains('Debrecen')
        cy.get('.weather-details__content').should('not.exist')
        cy.contains('Weather details').click()
        cy.get('.weather-details__content').should('exist')
        cy.contains('Weather details').click()
        cy.get('.weather-details__content').should('not.exist')
    })
})
