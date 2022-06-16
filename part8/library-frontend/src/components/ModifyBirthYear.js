import React, { useState } from 'react'
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

const ModifyBirthYear = ({ currentAuthors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const authorNames = currentAuthors.map((author) => ({
    value: author.name,
    label: author.name,
  }))

  const submitAuthorModification = (event) => {
    event.preventDefault()
    updateAuthor({
      variables: { name: selectedAuthor.value, born: Number(born) },
    })
    setSelectedAuthor(null)
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submitAuthorModification}>
        <div>
          name{' '}
          <Select
            defaultValue={selectedAuthor}
            onChange={setSelectedAuthor}
            options={authorNames}
          />
        </div>
        <div></div>
        <div>
          born{' '}
          <input
            type="text"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default ModifyBirthYear
