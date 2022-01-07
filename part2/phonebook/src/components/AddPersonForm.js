import React from 'react'
import InputField from './InputField'

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

export default AddPersonForm