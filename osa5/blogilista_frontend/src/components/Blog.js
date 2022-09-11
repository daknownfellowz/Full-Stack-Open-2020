import React, { useState } from 'react'

const Blog = ({blog, updateBlog, loggedUser, removeBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
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

  const addLike = () => {
    console.log('Like button clicked!!!')
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const remove = () => {
    console.log('Remove button clicked!!!')
    removeBlog({
      ...blog      
    })
  }
  
  return (
  <div style={blogStyle}>
    <div>
      <a onClick={toggleVisibility}>{blog.title} {blog.author}</a> &nbsp;
      <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>      
      <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      
      <div style={showWhenVisible}>
        {blog.url}
        <br />likes {blog.likes} <button onClick={addLike}>like</button>
        <br />
        {blog.user !== undefined ? (
            (blog.user.name)
        ) : (
            <div></div>
        )}
        {blog.user !== undefined && blog.user.name == loggedUser.name ? (
            <div><button onClick={remove} style={removeButtonStyle}>remove</button></div>
        ) : (
            <div></div>
        )}

      </div>

    </div>
  </div>
)}

export default Blog