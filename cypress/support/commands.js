Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Frank',
    lastName: 'Underwood',
    email: 'frankund@test.com',
    textArea: 'Test'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.textArea)
    cy.contains('button', 'Enviar').click()
})