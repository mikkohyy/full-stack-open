import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavBar = styled.div`
  background: lightgrey;
  padding: 0.2em;
`

const padding = {
  padding: '0.2em',
}

const NavigationBar = () => {
  const user = useSelector((state) => state.user)

  return (
    <NavBar>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user.name} logged in
    </NavBar>
  )
}

export default NavigationBar
