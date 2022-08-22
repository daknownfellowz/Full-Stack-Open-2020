import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()    
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )      
      blogService.setToken(user.token)
      console.log(user.token);
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = async (event) => {
    event.preventDefault()
    console.log('Logging out...')
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    console.log('Add new blog data: ', title, author, url)

    const blog = await blogService.create({
      title, author, url,
    })

    setNotificationMessage(
      `a new blog ${title} by ${author} added`
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)

    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification notificationMessage={notificationMessage} />
        <Error errorMessage={errorMessage} />

        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification notificationMessage={notificationMessage} />
      <Error errorMessage={errorMessage} />

      <p>{user.name} logged in <button onClick={logOut}>logout</button></p>

      <h2>create new</h2>
      <form onSubmit={addBlog}>
      <div>
        title:
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
      </form>  

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

const Notification = ({ notificationMessage }) => {

  const notificationStyle = {
    color: 'green',
    backgroundColor: 'lightgrey',
    fontStyle: 'italic',
    fontSize: '20px',
    borderRadius: '5px',
    border: '2px solid green',
    padding: '10px',
    marginBottom: '10px'
  }

  if (notificationMessage === null || notificationMessage == '') {
    return null
  }

  return (
    <div style={notificationStyle}>
      {notificationMessage}
    </div>
  )
}

const Error = ({ errorMessage }) => {

  const errorStyle = {
    color: 'red',
    backgroundColor: 'lightgrey',
    fontStyle: 'italic',
    fontSize: '20px',
    borderRadius: '5px',
    border: '2px solid red',
    padding: '10px',
    marginBottom: '10px'
  }

  if (errorMessage === null || errorMessage == '') {
    return null
  }

  return (
    <div style={errorStyle}>
      {errorMessage}
    </div>
  )
}

export default App
