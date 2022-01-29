import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

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
        key: newName,
        id: persons.length + 1
      } 
      
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>  
        <div>
          name:
          <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

        {persons.map(person => 
            <Person key={person.id} person={person} />
        )}
      
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <p>{person.name}</p>
  )
}

export default App