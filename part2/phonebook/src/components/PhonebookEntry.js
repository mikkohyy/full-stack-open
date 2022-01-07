import React from 'react'
import Person from './Person'
import Button from './Button'

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

export default PhonebookEntry