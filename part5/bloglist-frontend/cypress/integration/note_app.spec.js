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

    it('A blog can be created', function() {
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

    describe('When a blog already exists', function() {
      beforeEach(function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('React patterns')
        cy.get('#author').type('Michael Chan')
        cy.get('#url').type('https://reactpatterns.com/')
        cy.get('#create-button').click()
      })

      it('User can add a like to a blog', function() {
        cy.contains('view').click()
        cy.get('.blog-likes:first').should('contain', '0')
        cy.contains('like').click()
        cy.get('.blog-likes:first').should('contain', '1')
      })

      it('User can delete it', function() {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('.notification-field')
          .should('contain', 'Deleted React patterns by Michael Chan')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
        cy.contains('"React patterns" by Michael Chan').should('not.exist')
      })

      it.only('Only user who has added the blog can delete it', function() {
        const user = {
          username: 'acidburn',
          name: 'Kate Libby',
          password: 'nrubdica'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.contains('logout').click()

        cy.get('#login-input-username').type('acidburn')
        cy.get('#login-input-password').type('nrubdica')
        cy.get('#login-button').click()

        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('.notification-field')
          .should('contain', 'Was not able to delete the blog')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
        cy.contains('"React patterns" by Michael Chan')
      })
    })
  })
})