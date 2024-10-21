import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [state, setState] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initPersons => setPersons(initPersons))
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

  const handleDelete = (id) => {
    const deletedPerson = persons.find(p => p.id === id)
    
    const confirmDelete = confirm(`Delete ${deletedPerson.name}?`)
    
    if (confirmDelete) {
      personService
      .remove(id)
      .then(response => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const updatePersonNumber = (person) => {
    const confirmUpdate = confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)

    if (confirmUpdate) {
      const updatedPerson = {
        ...person,
        number: newNumber
      }

      personService
        .update(updatedPerson.id, updatedPerson)
        .then(returnedObject => {
          const updatedPersons = persons.filter(p => p.id !== updatedPerson.id)
          
          setPersons(updatedPersons.concat(returnedObject))
          setNewName("")
          setNewNumber("")

          setMessage(`number ${person.number} updated to ${updatedPerson.number}`)
          setState(true)

          setTimeout(() => {
            setMessage(null)
            setState(false)
          }, 3000)
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }

  const addName = (event) => {
    event.preventDefault();

    if (newName === "" || newNumber === "") {
      return
    }

    const found = persons.find(n => n.name === newName)

    if (found) {
      updatePersonNumber(found)
    } else {
      const newObject = {
        name: newName,
        number: newNumber
      }
      
      personService
      .create(newObject)
      .then(returnedObject => {
        setPersons(persons.concat(returnedObject))
        setNewName("")
        setNewNumber("")

        setMessage(`Added ${returnedObject.name}`)
        setState(true)

        setTimeout(() => {
          setMessage(null)
          setState(false)
        }, 3000)
      })
    }
  }

  const filteredPersons = persons.filter(person => person.name.includes(filter))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} state={state}/>
      {/* <Notification message="tessdf54 t" state={false} /> */}
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
      <Persons persons={filteredPersons} deletePerson={handleDelete}/>
    </div>
  )
}

export default App