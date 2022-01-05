import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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
    <>
      {name} {number}
    </>
  )
}

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick}>delete</button> 
  )
}

const PhonebookEntry = ({ person, handleRemove }) => {
  const removePerson = () => {
    return handleRemove(person.id, person.name)
  }
  
  return(
    <div>
      <Person person={person} /> <Button onClick={removePerson} />
    </div>
  )
}

const FilteredPhonebook = ({ persons, handleRemove }) => {
  return (
    <div>
      {persons.map(person => 
        <PhonebookEntry key={person.id} person={person} handleRemove={handleRemove} />
      )}
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
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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

  const updatePerson = () => {
    const personToBeUpdated = persons.find(person => person.name === newName)
    const modifiedPerson = { ...personToBeUpdated, number: newNumber}
    
    personService
      .update(modifiedPerson, modifiedPerson.id)
      .then(updatedPerson => {
        const updatedPersons = persons.map(
          person => person.id !== updatedPerson.id ? person : updatedPerson
        )
        setPersons(updatedPersons)
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameAlreadyInPhonebook = persons.some((person) => person.name === newName)

    const printUpdateConfirmationMessage = (name) => {
      return `${name} is already added to the phonebook, replace the old number with a new one?`
    }

    if (nameAlreadyInPhonebook) {
      if (window.confirm(printUpdateConfirmationMessage(newName))) {
        updatePerson()
        resetInputFields(event)
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          resetInputFields(event)
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      const updatedPersons = persons.filter(person => person.id !== id)
      setPersons(updatedPersons)
      personService.remove(id)
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
      <FilteredPhonebook persons={filteredPersons} handleRemove={deletePerson}/>
    </div>
  )
}

export default App