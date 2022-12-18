import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  TextField,
  Label,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material"

const LoginForm = ({ handleSubmit }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('username and pw ', username, password)
    handleSubmit({ username, password })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2 className="header">Log in to application</h2>

      <form onSubmit={handleLogin}>
        <div class="loginform">
            <TextField label="username" id='username' value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div class="loginform">
            <TextField label="password" type='password' id='password' value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />            
        </div>
        <div class="loginform">
        <Button variant="contained" color="primary" type="submit" id="login-button">
            login
        </Button>
        </div>

      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm