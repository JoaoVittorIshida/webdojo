describe('POST /api/users/register', () => {

  it('Deve cadastrar um novo usuário', () => {

    const user = {
      name: 'João Vittor 1',
      email: 'joao1@teste.com',
      password: 'teste123'

    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.equal(201)
      expect(response.body.message).to.eq('User successfully registered.')
      expect(response.body.user.id).to.match(/^-?\d+$/)
      expect(response.body.user.name).to.eq(user.name)
      expect(response.body.user.email).to.eq(user.email)

    })


  })

  it('Não cadastrar email duplicado', () => {

    const user = {
      name: 'João Vittor 2',
      email: 'joao2@teste.com',
      password: 'teste123'

    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.equal(201)
    })

    cy.postUser(user).then((response) => {
      expect(response.status).to.equal(409)
      expect(response.body.error).to.eq('A user with this email address already exists.')
    })


  })

  it('Campo name é obrigatório', () => {

    const user = {
      email: 'joao@teste.com',
      password: 'teste123'

    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.error).to.eq('Name is required.')

    })
  })

  it('Campo email é obrigatório', () => {

    const user = {
      name: 'João Vittor',
      password: 'teste123'

    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.error).to.eq('Email is required.')

    })
  })

  it('Campo senha é obrigatório', () => {

    const user = {
      name: 'João Vittor',
      email: 'joao@teste.com'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.error).to.eq('Password is required.')

    })
  })

  it('Erro de formato JSON inválido', () => {

    const userString = `{
      "name": "João Vittor",
      "email": "joao@teste.com"    
      "password": "teste123"
        }` // JSON malformado de propósito, falta virgula

    cy.postUser(userString).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.error).to.eq('Invalid JSON format.')

    })
  })



})
