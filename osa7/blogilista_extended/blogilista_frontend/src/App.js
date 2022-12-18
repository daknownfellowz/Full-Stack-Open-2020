import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BlogList from './components/BlogList'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import Notification from './components/Notification'

import Users from './components/Users'

//import Users from './components/Users' . // 6.12. Lisää nää myöhemmin!
//import User from './components/User'     // 6.12. Lisää nää myöhemmin!

import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { createNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'


const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')  
  const [blogFormVisible, setBlogFormVisible] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {    
    const user = JSON.parse(localStorage.getItem('loggedBlogappUser'))
    dispatch(setUser(user))
  }, [dispatch])
  
  const handleLogin = async ({ username, password }) => {
    
    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)      
      dispatch(setUser(user))      
      setBlogFormVisible(false)
      setUsername('')
      setPassword('')  
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
    } catch (exception) {
      console.log('wrong credentials')
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {    
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedBlogappUser')    
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
    const blog = dispatch(createBlog(newBlog))

    dispatch(
      createNotification(
        {
          message: `A new blog ${blog.title} by ${blog.author} added`,
          type: 'success',
        },
        5
      )
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

      <Users users={users} />

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