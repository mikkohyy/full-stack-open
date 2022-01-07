import React from 'react'

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
  
export default Header