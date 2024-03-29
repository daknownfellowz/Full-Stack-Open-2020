const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"      
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"      
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"      
    },
    {
      id: 4,
      name: "Mary Poppendick",
      number: "39-23-6423122"      
    }
]

app.get('/', (req, res) => {    
  res.send('<h1>3.1 puhelinluettelon backend step1 pääsivu ' + Math.random() + '</h1>')
})

app.get('/info', (req, res) => {
  res.send('<p>Phonebook has info for ' + persons.length + ' persons</p><p>' + new Date() + '</p>')
})
    
app.get('/api/persons', (req, res) => {
  res.json(persons)
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
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
    
  response.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * 100);
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  } else {
    const searchPerson = persons.find(person => person.name === body.name)

    if (searchPerson) {      
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }  
  
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,    
  }
  
  persons = persons.concat(person)
  
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})