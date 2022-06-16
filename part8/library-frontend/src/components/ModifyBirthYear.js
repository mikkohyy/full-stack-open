import React, { useState } from 'react'
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'

const ModifyBirthYear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submitAuthorModification = (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, born: Number(born) } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submitAuthorModification}>
        <div>
          name{' '}
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
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
