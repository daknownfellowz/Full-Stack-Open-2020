import React from 'react'

const Users = ({ users }) => {
  console.log('USERS ', users[0])
  return (
    <div>
        <h2>Users</h2>
        <table>
        <tr><th></th><th>blogs created</th></tr> 
        {users.map(user => <tr>
            <td>{user.name}</td><td>{user.blogs.length}</td>
        </tr>)} 
        </table>           
    </div>
  )
}

export default Users