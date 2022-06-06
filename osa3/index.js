require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
//app.use(express.static('build'))

const Person = require('./models/person')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (req, res) => {    
  res.send('<h1>3.1 puhelinluettelon backend step1 pääsivu ' + Math.random() + '</h1>')
})

app.get('/info', (req, res) => {
  res.send('<p>Phonebook has info for ' + persons.length + ' persons</p><p>' + new Date() + '</p>')
})
    
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })  
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
    
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'unable to delete given id' })
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  console.log('Saving new person...')
  
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }  
  
  const personToSave = new Person({
    name: body.name,
    number: body.number,    
  })

  personToSave.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})