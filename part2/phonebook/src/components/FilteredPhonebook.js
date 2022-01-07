import React from 'react'
import PhonebookEntry from './PhonebookEntry'

const FilteredPhonebook = ({ persons, handleRemove }) => {
  return (
    <div>
      {persons.map(person => 
        <PhonebookEntry key={person.id} person={person} handleRemove={handleRemove} />
      )}
    </div>
  )
}

export default FilteredPhonebook