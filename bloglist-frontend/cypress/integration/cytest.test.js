/* eslint-disable no-undef */
describe('Blog app', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
          name: 'name1',
          username: 'username1',
          password: 'password1'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
      })
    
    it('Login form is shown', () => {
        cy.contains('login').click()
        cy.get('#username').type('username1')
        cy.get('#password').type('password1')
        cy.get('#login-button').click()

        cy.contains('username1 logged in')
    })

    describe('Login', () => {
      it('succeeds with correct credentials', () => {
        cy.contains('login').click()
        cy.get('#username').type('username1')
        cy.get('#password').type('password1')
        cy.get('#login-button').click()

        cy.contains('username1 logged in')
      })

      it('fails with wrong credentials', () => {
        cy.contains('login').click()
        cy.get('#username').type('username1')
        cy.get('#password').type('password2')
        cy.get('#login-button').click()

        cy.contains('username1 logged in').should('not.exist')
      })
    })
})