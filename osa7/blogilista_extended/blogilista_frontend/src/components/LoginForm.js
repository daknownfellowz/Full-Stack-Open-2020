import React from 'react'
import { useState } from 'react'
// import { useDispatch } from 'react-redux' . // 7.13
import PropTypes from 'prop-types'

// import { loginUser } from '../reducers/loginReducer' // 7.13

const LoginForm = ({ handleSubmit }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('username and pw ', username, password)
    handleSubmit({ username, password })

    // 7.13: muuta dispatch tyyppiseksi
    //dispatch(onLogin({ username, password }));

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleLogin}>
        <div>
            username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm