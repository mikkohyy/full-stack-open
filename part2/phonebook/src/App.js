import React, { useState, useEffect } from 'react'
import personService from './services/persons'

import AddPersonForm from './components/AddPersonForm'
import FilteredPhonebook from './components/FilteredPhonebook'
import Header from './components/Header'
import InputField from './components/InputField'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [notificationInfo, setNotificationInfo] = useState(
    {message: null, wasSuccessfulOperation: null}
  )

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

  const notifyUser = ({ message, wasSuccessfulOperation }) => {
    const notification = {
      message: message,
      wasSuccessfulOperation: wasSuccessfulOperation
    }

    setNotificationInfo(notification)
    setTimeout(() => {
      setNotificationInfo({ message: null, wasSuccessfulOperation: null })
    }, 5000)
    
  }

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

        const notification = {
          message: `Updated ${updatedPerson.name}'s number!`,
          wasSuccessfulOperation: true
        }

        notifyUser(notification)
      })
      .catch(error => {
        const notification = {
          message: 'error.response.data',
          wasSuccessfulOperation: false
        }
        notifyUser(notification)
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

          const newNotification = {
            message: `Added ${newPerson.name}`,
            wasSuccessfulOperation: true
          }

          notifyUser(newNotification)
        })
        .catch(error => {
          const notification = {
            message: error.response.data.error,
            wasSuccessfulOperation: false
          }
  
          notifyUser(notification)  
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
        .then(response => {
          const updatedPersons = persons.filter(person => person.id !== id)
          setPersons(updatedPersons)

          const notification = {
            message: `Deleted ${name}`,
            wasSuccessfulOperation: true
          }
          notifyUser(notification)    
        })
        .catch(error => {
          const updatedPersons = persons.filter(person => person.id !== id)
          setPersons(updatedPersons)
          const notification = {
            message: `Information of ${name} has already been removed from server`,
            wasSuccessfulOperation: false
          }
          notifyUser(notification)
        })
      
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
      <Notification info={notificationInfo} />
      filter shown with <InputField value={searchField} onChange={handleSearchFieldChange} />
      <Header text="Add a new" size="h3" />
      <AddPersonForm variablesAndFunctions={formVariablesAndFunctions} />
      <Header text="Numbers" size="h3" />
      <FilteredPhonebook persons={filteredPersons} handleRemove={deletePerson}/>
    </div>
  )
}

export default App