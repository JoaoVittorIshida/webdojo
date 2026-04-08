const express = require('express')
const cors = require('cors')
const { Prisma } = require('@prisma/client')
const prisma = require('./prisma')

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API do curso Ninja do Cypress!' })
})

app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name) {
    return res.status(400).json({ error: 'Name is required.' })
  }

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' })
  }

  if (!password) {
    return res.status(400).json({ error: 'Password is required.' })
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    })

    return res.status(201).json({
      message: 'User successfully registered.',
      user
    })
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return res.status(409).json({
        error: 'A user with this email address already exists.'
      })
    }

    console.error(error)
    return res.status(500).json({
      error: 'An internal server error occurred while registering the user.'
    })
  }
})

app.listen(port, () => {
  console.log(`API Ninja do Cypress rodando em ${port}`)
})