import React from 'react'

const Person = ({ person }) => {
    const {name, number } = person
    return (
      <>
        {name} {number}
      </>
    )
  }
  
export default Person