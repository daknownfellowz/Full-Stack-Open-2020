import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BlogList from './components/BlogList'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import Notification from './components/Notification'

//import Users from './components/Users' . // 6.12. Lisää nää myöhemmin!
//import User from './components/User'     // 6.12. Lisää nää myöhemmin!

//import userService from './services/users'

import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { createNotification } from './reducers/notificationReducer'
//import { login } from './reducers/loginReducer'
//import { initializeUsers } from './reducers/userReducer'


const App = () => {

  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  // Todo: reduxoi allaoleva
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  // Todo: reduxoi logini 
  const handleLogin = async ({ username, password }) => {

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      console.log(user.token)
      setUser(user)
      setBlogFormVisible(false)
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
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => {

    return(
      <div>
        <div>
          <Notification />
        </div>
        <div>
          <LoginForm
            errorMessage={errorMessage}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}/>
        </div>
      </div>
    )

  }

  const blogAdder = async (newBlog) => {

    console.log('Add new blog data: ', newBlog.title, newBlog.author, newBlog.url)    
    const blog = dispatch(createBlog(newBlog)) // redux

    // redux
    dispatch(
      createNotification(
        {
          message: `A new blog ${blog.title} by ${blog.author} added`,
          type: 'success',
        },
        5
      )
    )

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

      <>{loginForm()}
      </>
    )
  }

  return (
    <div>
      <h2>Blogs redux</h2>

      <Notification />

      <p>{user.name} logged in <button onClick={logOut}>logout</button></p>

      <BlogList />

      <Togglable buttonLabel='new blog'>      
      <BlogForm
          title={title}
          author={author}
          url={url}
          blogFormVisible={blogFormVisible}
          setTitle={({ target }) => setTitle(target.value)}
          setAuthor={({ target }) => setAuthor(target.value)}
          setUrl={({ target }) => setUrl(target.value)}
          setBlogFormVisible={({ target }) => setBlogFormVisible(target.value)}
          blogAdder={blogAdder}
        />

      </Togglable>
    </div>
  )
}
export default App