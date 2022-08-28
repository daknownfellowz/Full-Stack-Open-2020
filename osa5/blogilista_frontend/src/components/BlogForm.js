const BlogForm = ({
    addBlog,
    setTitle,
    setAuthor,
    setUrl,
    title,
    author,
    url
   }) => {
return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
      <div>
        title:
          <input
          value={title}
          onChange={setTitle}     
        />
      </div>
      <div>
        author:
          <input          
          value={author}          
          onChange={setAuthor}
        />
      </div>
      <div>
        url:
          <input
          value={url}
          onChange={setUrl}
        />
      </div>
      <button type="submit">create</button>
      </form>

    </div>
  )
}

export default BlogForm