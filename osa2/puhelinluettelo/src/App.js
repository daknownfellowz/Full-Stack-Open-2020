import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    
    var found = false;
    persons.forEach(function(item, index, array) {
      if (item.name == newName) {
        found = true;
      }
    })

    if (found) {
      alert(`${newName} is already added to phonebook`);
    } else {

      const personObject = {
        content: newName,  
        name: newName,
        number: newNumber,
        key: newName,
        id: persons.length + 1
      } 

      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewNumber('')
        console.log(response)
      })
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
      <Persons persons={persons}/>

    </div>
  )
}

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>  
    <div>
      name:
      <input value={props.newName} onChange={props.handlePersonChange} />
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({persons}) => {
  return (
    <div>
      <h2>Numbers</h2>
        {persons.map(person => 
            <Person key={person.id} person={person} />
        )}
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

export default App