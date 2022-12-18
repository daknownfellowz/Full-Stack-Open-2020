import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = ({ user }) => {

    const id = useParams().id
    console.log('GIVEN ID ', id)

    const blogs = useSelector(state => state.blogs.filter(blog => blog.user.id === id))
    if (!blogs || blogs.length === 0) {
      return (<p><strong>no blogs</strong></p>)
    }
  
    return (
      <div>
        <h2 className="header">{blogs[0].user.name}</h2>
        {blogs.length > 0 ? (
          <div>
            <p>
              <strong>added blogs</strong>
            </p>
            <ul>
              {blogs.map((blog) => (
                <li key={blog.title}>{blog.title}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>no blogs</p>
        )}
      </div>
    )
  }
  
  export default User