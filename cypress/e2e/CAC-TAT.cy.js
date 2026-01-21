describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
        cy.visit('./src/index.html')
  })
it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Segrini')
    cy.get('#email').type('joao@test.com')
    cy.get('#open-text-area').type(longText, {delay : 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

it('Exibe mensagem de erro ao submeter o formulário com um email inválido', () =>{
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Segrini')
    cy.get('#email').type('joao@test,com')
    cy.get('#open-text-area').type('test')
    cy.contains('button', 'Enviar').click()

    cy.get('.error > strong').should('be.visible')
  })

it('Teste numero de telefone inválido', () =>{
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })

it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () =>{
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Segrini')
    cy.get('#email').type('joao@test,com')
    cy.get('#open-text-area').type('test')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error > strong').should('be.visible')
  })

it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('João')
      .should('have.value', 'João')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Segrini')
      .should('have.value', 'Segrini')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('joao@test.com')
      .should('have.value', 'joao@test.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      .clear()
      .should('have.value', '')
})

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error > strong').should('be.visible')
})

it('envia o formulário com sucesso usando um comando customizado', () => {
  cy.fillMandatoryFieldsAndSubmit()

  cy.get('.success').should('be.visible')
})

it('seleciona um produto (YouTube) por seu texto', () => {
  cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
})

it('seleciona um produto (Mentoria) por seu valor', () => {
  cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
})

it.only('seleciona um produto (Blog) por seu índice', () => {
  cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
})

})
