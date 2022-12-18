/* eslint-disable */
import loginService from '../services/login'
//import blogService from '../services/blogs'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}

export const setUser = user => {
  console.log('at set user')
  return {
      type: 'SET_USER',
      data: user
  }
}

export default loginReducer