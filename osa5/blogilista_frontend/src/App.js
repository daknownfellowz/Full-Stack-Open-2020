import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
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
  const [blogFormVisible, setBlogFormVisible] = useState(null)

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

  // add likes
  const updateBlog = async(blog) => {
    const updateBlog = { 
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
    }    
    console.log('Like button clicked in blog: ', updateBlog)

    try {
      await blogService.update(blog.id, updateBlog)

      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )

    } catch (exception) {
      console.log('unable to update!')
      setErrorMessage('unable to update')
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
    setBlogFormVisible(false)
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

      <Togglable buttonLabel='new blog'>
        <BlogForm
          title={title}
          author={author}
          url={url}
          setTitle={({ target }) => setTitle(target.value)}
          setAuthor={({ target }) => setAuthor(target.value)}
          setUrl={({ target }) => setUrl(target.value)}
          setBlogFormVisible={({ target }) => setBlogFormVisible(target.value)}
          addBlog={addBlog}
        />
      </Togglable>   

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
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
