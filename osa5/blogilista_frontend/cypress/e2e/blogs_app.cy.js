describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create here a user to backend
    const user = {
      name: 'Hard Kokki',
      username: 'hkokki',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('hkokki')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Hard Kokki logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('hkokki')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('hkokki')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog title created by cypress')
      cy.get('#author').type('a blog author created by cypress')
      cy.get('#url').type('a blog url created by cypress')
      cy.get('#create').click()

      cy.contains('a blog title created by cypress')
    })

    it('it can be liked', function () {
      // create new blog
      cy.contains('new blog').click()
      cy.get('#title').type('a blog title created by cypress')
      cy.get('#author').type('a blog author created by cypress')
      cy.get('#url').type('a blog url created by cypress')
      cy.get('#create').click()
      // open blog and click like
      cy.contains('view').click()
      cy.contains('a blog title created by cypress')
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })

  })

})