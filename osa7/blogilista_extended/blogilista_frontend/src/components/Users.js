import React from 'react'


import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  console.log('USERS ', users[0])
  return (
    <div>
        <h2 className="header">Users</h2>
        <table>
        <tr><th></th><th>blogs created</th></tr> 
        {users.map(user => <tr>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td>
        </tr>)} 
        </table>           
    </div>
  )
}

export default Users