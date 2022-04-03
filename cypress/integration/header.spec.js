describe('Header Test', () => {
  it('opens the app and finds the header and location request content', () => {
    cy.visit('/')
    cy.contains('h1', 'Weather App')
    cy.contains('span', 'Would you like to see the weather at your current location?')
    cy.contains('button', 'Get location')
    cy.contains('button', 'No, thanks')
  })
  it('hides the request location box when the no thanks option is clicked', () => {
    cy.contains('No, thanks').click()
    cy.get('.request-location').should('not.exist')
    cy.reload()
    cy.get('.request-location').should('not.exist')
    cy.clearLocalStorage()
    cy.reload();
    cy.get('.request-location').should('exist')
  })
  it('shows the request location box when the localstorage is cleared', () => {
    cy.clearLocalStorage()
    cy.reload()
    cy.get('.request-location').should('exist')
  })
})
