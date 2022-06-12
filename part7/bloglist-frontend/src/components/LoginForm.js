import React from 'react'
import { TextField, Button } from '@mui/material'

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  return (
    <form id="login-form" onSubmit={handleLogin}>
      <div>
        <TextField
          id="login-input-username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          label="username"
        />
      </div>
      <div>
        <TextField
          id="login-input-password"
          value={password}
          type="password"
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          label="password"
        />
      </div>
      <div>
        <Button
          id="login-button"
          variant="outlined"
          color="primary"
          type="submit"
          size="small"
        >
          login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
