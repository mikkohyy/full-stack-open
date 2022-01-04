import React, { useState, useEffect } from 'react'

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
    <form>
      <div>
        name: <InputField value={name.variable} onChange={name.handleFunction} />
      </div>
      <div>
        number: <InputField value={number.variable} onChange={number.handleFunction} />
      </div>
      <div>
        <button type="submit" onClick={adding.addFunction}>add</button>
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

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
      setNewName('')
      setNewNumber('')
    }
  }

  const addingVariablesAndFunctions = {
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
        filter shown with <InputField value={searchField} onChange={handleSearchFieldChange}/>
      <Header text="Add a new" size="h3" />
      <AddPersonForm variablesAndFunctions={addingVariablesAndFunctions} />
      <Header text="Numbers" size="h3" />
      <FilteredPhonebook persons={filteredPersons} />
    </div>
  )
}

export default App