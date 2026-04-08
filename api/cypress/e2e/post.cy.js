import { faker } from '@faker-js/faker'

describe('POST /api/users/register', () => {

  it('Deve cadastrar um novo usuário', () => {

    const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'teste123'

    }

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
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'teste123'

    }

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
        email: faker.internet.email(),
        password: 'teste123'

    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.error).to.eq('Name is required.')

    })
  })

  it('Campo email é obrigatório', () => {

    const user = {
        name: faker.person.fullName(),
        password: 'teste123'

    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.error).to.eq('Email is required.')

    })
  })

  it('Campo senha é obrigatório', () => {

    const user = {
        name: faker.person.fullName(),
        email: faker.internet.email()
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.error).to.eq('Password is required.')

    })
  })



})
