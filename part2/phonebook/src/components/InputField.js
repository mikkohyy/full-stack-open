import React from 'react'

const InputField = ({ value, onChange }) => {
  return (
    <input value={value} onChange={onChange}/>
  )
}  

export default InputField