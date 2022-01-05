import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Header = ({ text, size }) => {
  if (size === "h2") {
    return(
      <h2>{text}</h2>
    )
  } else if (size === "h3") {
    return(
      <h3>{text}</h3>
    )
  }
}

const InputField = ({ value, onChange }) => {
  return (
    <input value={value} onChange={onChange}/>
  )
}

const AddPersonForm = ({ variablesAndFunctions }) => {
  const { name, number, adding } = variablesAndFunctions  

  return (
    <form onSubmit={adding.addFunction}>
      <div>
        name: <InputField value={name.variable} onChange={name.handleFunction} />
      </div>
      <div>
        number: <InputField value={number.variable} onChange={number.handleFunction} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ person }) => {
  const {name, number } = person
  return (
    <div>{name} {number}</div>
  )
}

const FilteredPhonebook = ({ persons }) => {
  return (
    <div>
      {persons.map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value)
  }

  useEffect(() => {
    const filteredAfterChangeInSearchField = persons.filter(
      person => person.name.toLowerCase().includes(searchField.toLowerCase())
    )
    setFilteredPersons(filteredAfterChangeInSearchField)
  }, [persons, searchField])

  const resetInputFields = (event) => {
    const formElementsAsArray = Array.from(event.target)
    formElementsAsArray.forEach((element) => element.value = "")
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameAlreadyInPhonebook = persons.some((person) => person.name === newName)

    if (nameAlreadyInPhonebook) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      resetInputFields(event)
    }
  }

  const formVariablesAndFunctions = {
    name: {
      field: newName,
      handleFunction: handleNameChange,
    },
    number: {
      field: newNumber,
      handleFunction: handleNumberChange,
    },
    adding: {
      addFunction: addPerson 
    }
  }

  return (
    <div>
      <Header text="Phonebook" size="h2" />
        filter shown with <InputField value={searchField} onChange={handleSearchFieldChange} />
      <Header text="Add a new" size="h3" />
      <AddPersonForm variablesAndFunctions={formVariablesAndFunctions} />
      <Header text="Numbers" size="h3" />
      <FilteredPhonebook persons={filteredPersons} />
    </div>
  )
}

export default App