import React,{ useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ blogAdder }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleChangeTitle = (event) => {
    event.preventDefault()
    setNewTitle(event.target.value)
  }

  const handleChangeAuthor = (event) => {
    event.preventDefault()
    setNewAuthor(event.target.value)
  }

  const handleChangeUrl = (event) => {
    event.preventDefault()
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    blogAdder({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            placeholder='Title'
            value={newTitle}
            onChange={handleChangeTitle}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            placeholder='Author'
            value={newAuthor}
            onChange={handleChangeAuthor}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            placeholder='Url'
            value={newUrl}
            onChange={handleChangeUrl}
          />
        </div>
        <button id="create" type="submit">create</button>
      </form>

    </div>
  )
}

BlogForm.propTypes = {
  handleChangeTitle: PropTypes.func.isRequired
}

export default BlogForm