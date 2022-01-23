describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'zerocool',
      name: 'Dade Murphy',
      password: 'loocorez'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to the application')
    cy.get('#login-form')
      .should('contain', 'username')
      .and('contain', 'password')
    cy.get('#login-button').should('contain', 'login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#login-input-username').type('zerocool')
      cy.get('#login-input-password').type('loocorez')
      cy.get('#login-button').click()

      cy.get('.notification-field')
        .should('contain', 'logged in Dade Murphy')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('blogs')
      cy.contains('create new')
    })

    it('fails with wrong credentials', function() {
      cy.get('#login-input-username').type('zerocool')
      cy.get('#login-input-password').type('i-hack')
      cy.get('#login-button').click()

      cy.get('.notification-field')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('#login-form')
        .should('contain', 'username')
        .and('contain', 'password')
      cy.get('#login-button').should('contain', 'login')
    })
  })

})