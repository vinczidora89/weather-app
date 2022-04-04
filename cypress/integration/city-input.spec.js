describe('City input test', () => {
    it('checks city input content', () => {
        cy.visit('/')
        cy.contains('span', 'Would you like to see the weather at your current location?')
        cy.get('input').should('have.id', 'weather-city')
        cy.contains('button', 'Search')
        cy.get('button').should('be.disabled')
        cy.get('.city-input__options').should('not.exist')
    })
    it('checks if the button is disabled and the city autosuggest list not visible by default', () => {
        cy.get('button').should('be.disabled')
        cy.get('.city-input__options').should('not.exist')
    })
    it('fills the city input with incorrect data', () => {
        cy.get('input').clear();
        cy.get('input').type('thisisnotacity');
        cy.get('button').should('be.disabled')
        cy.get('input').clear();
    })
    it('fills the city input and gets weather for the selected location', () => {
        cy.get('input').clear();
        cy.get('input').type('Nagykanizsa');
        cy.get('.city-input__options').should('exist')
        cy.get('.city-input__option').should('exist')
        cy.get('.city-input__option').first().click()
        cy.get('button').should('not.be.disabled')
        cy.get('.city-input__button').click()
        cy.get('.weather-current__location').contains('Nagykanizsa')
    })
})
