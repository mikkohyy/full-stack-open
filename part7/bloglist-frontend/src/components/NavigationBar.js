import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'

const NavigationBar = () => {
  const user = useSelector((state) => state.user)

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        {user.name} logged in
      </Toolbar>
    </AppBar>
  )
}

export default NavigationBar
