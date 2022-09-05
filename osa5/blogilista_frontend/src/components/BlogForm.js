import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
   const [newBlog, setNewBlog] = useState('')

   const handleChange = (event) => {
    setNewBlog(event.target.value)
   }

   const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.newTitle,
      author: newBlog.newAuthor,
      url: newBlog.newUrl,
    })

    setNewBlog('')
   }

  return (
      <div>
        <h2>create new</h2>

        <form onSubmit={addBlog}>
        <div>
          title:
            <input
            value={newBlog.title}
            onChange={handleChange}     
          />
        </div>
        <div>
          author:
            <input          
            value={newBlog.author}          
            onChange={handleChange}
          />
        </div>
        <div>
          url:
            <input
            value={newBlog.url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">create</button>
        </form>

      </div>
    )
}

export default BlogForm