const express = require('express')
const app = express()
const port = 3333

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: "API do curso Ninja do Cypress!" })
})

app.post('/api/users/register', (req, res) => {

  console.log(req.body)
  res.status(201).json({ message: "Usuário registrado com sucesso!" })
  
})

app.listen(port, () => {
  console.log(`API Ninja do Cypress rodando em ${port}`)
})