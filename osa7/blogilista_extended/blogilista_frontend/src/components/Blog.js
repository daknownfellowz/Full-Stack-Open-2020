import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, loggedUser }) => {

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }

  const removeButtonStyle = {
    backgroundColor: 'blue',
  }
  
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = (blog) => {
    const { id } = blog
    console.log('Like button clicked to ID: ', id)
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    dispatch(likeBlog(id, blogToUpdate))
  }

  const remove = (blog) => {
    console.log('Remove button clicked!!!')
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        <a className='blog' onClick={toggleVisibility}>{blog.title} {blog.author}</a> &nbsp;
        <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>

        <div style={showWhenVisible} className="togglableContent">
          {blog.url}
          <br />likes {blog.likes} <button onClick={() => addLike(blog)}>like</button>
          <br />
          {blog.user !== undefined ? (
            (blog.user.username)
          ) : (
            <div></div>
          )}
          {blog.user !== undefined /*&& blog.user.name === loggedUser.name*/ ? (
            <div><button onClick={() => remove(blog)} style={removeButtonStyle}>remove</button></div>
          ) : (
            <div></div>
          )}

        </div>

      </div>
    </div>
  )}

export default Blog