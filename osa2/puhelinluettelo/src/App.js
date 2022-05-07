import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const removePersonNumber = (id, name) => {

    if (window.confirm("Delete " + name + "?")) {
      personService
      .remove(id)
      .then(response => {        
        console.log(response)
        console.log('Person id ' + id + ' was deleted')
      })

      personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })      
    }
    
  }

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

      personService
      .create(personObject)
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
      
      <Persons persons={persons} removePerson={removePersonNumber} />

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

const Persons = ({persons, removePerson}) => {
  return (
    <div>
      <h2>Numbers</h2>
        {persons.map(person => 
          <Person 
            key={person.id} 
            person={person}
            removePerson={() => removePerson(person.id, person.name)}
          />
        )}
    </div>
  )
}

const Person = ({ person, removePerson }) => {
  return (
    <p>{person.name} {person.number} <button onClick={removePerson}>delete</button></p>
  )
}

export default App