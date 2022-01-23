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
    it('Succeeds with correct credentials', function() {
      cy.get('#login-input-username').type('zerocool')
      cy.get('#login-input-password').type('loocorez')
      cy.get('#login-button').click()

      cy.get('.notification-field')
        .should('contain', 'logged in Dade Murphy')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('blogs')
      cy.contains('create new')
    })

    it('Fails with wrong credentials', function() {
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#login-input-username').type('zerocool')
      cy.get('#login-input-password').type('loocorez')
      cy.get('#login-button').click()
    })

    it.only('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('React patterns')
      cy.get('#author').type('Michael Chan')
      cy.get('#url').type('https://reactpatterns.com/')
      cy.get('#create-button').click()

      cy.get('.blog:first')
        .should('contain', '"React patterns" by Michael Chan')

      cy.get('.notification-field')
        .should('contain', 'a new blog React patterns by Michael Chan was added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })
  })

})