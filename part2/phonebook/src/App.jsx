import axios from 'axios'
import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log("promise fullfiled");
        console.log(response.data)
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault();

    if (newName === "" || newNumber === "") {
      return
    }

    const found = persons.find(n => n.name === newName)

    if (found) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newState = persons.concat({
      name: newName,
      number: newNumber
    })

    setPersons(newState)
    setNewName("")
    setNewNumber("")
  }

  const filteredPersons = persons.filter(person => person.name.includes(filter))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleFilterChange}/>
      
      <h2>add a new</h2>
      <PersonForm 
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App