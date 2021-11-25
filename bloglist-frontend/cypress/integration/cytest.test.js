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
        cy.get('.error').should('contain', 'Wrong user name or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
        cy.get('html').should('not.contain', 'username1 logged in')
      })
    })

    describe('When logged in',() => {
      beforeEach(() => {
        cy.login({
          username: 'username1',
          password: 'password1'
        })
      })
  
      it('A blog can be created',() => {
        cy.contains('username1 logged in')
        cy.contains('create new blog').click()
        cy.get('#title').type('Tokino Sora')
        cy.get('#author').type('KuroKousuii')
        cy.get('#url').type('www.sora.com')
        cy.contains('Create').click()
        cy.contains('Tokino Sora by KuroKousuii')
      })

      describe('when several blog exists', () => {
        beforeEach(() => {
          cy.createBlog({title:"Amelia Watson", author:"KuroKousuii", url:"www.amelia.com", likes:333})
          cy.createBlog({title:"Mori Calliope", author:"KuroKousuii", url:"www.calliope.com", likes:333})
          cy.createBlog({title:"Ninomae Ina'nis", author:"KuroKousuii", url:"www.ina.com", likes:333})
          cy.createBlog({title:"Takanashi Kiara", author:"KuroKousuii", url:"www.kiara.com", likes:333})
          cy.createBlog({title:"Gawr Gura", author:"KuroKousuii", url:"www.gura.com", likes:333})
        })
        it('User can like a blog', () => {
          cy.contains('Amelia Watson by KuroKousuii').contains('show').click()
          cy.contains('Amelia Watson by KuroKousuii').contains('Like').click()
          cy.contains('Amelia Watson by KuroKousuii').contains('334')
        })
      })
    })
})