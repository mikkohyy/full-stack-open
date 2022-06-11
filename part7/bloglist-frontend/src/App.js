import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Button from './components/Button'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedInUser = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedInUser)
      )

      blogService.setToken(loggedInUser.token)

      setUser(loggedInUser)
      setUsername('')
      setPassword('')
      notifyUser(`logged in ${loggedInUser.name}`, true, 5)
    } catch (expection) {
      notifyUser('Wrong username or password', false, 5)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    notifyUser(`logged out ${user.name}`, true, 5)
    setUser(null)
    blogService.setToken(null)
  }

  const notifyUser = (message, wasSuccessful, displaySeconds) => {
    dispatch(
      setNotification({
        message: message,
        successful: wasSuccessful,
        displaySeconds: displaySeconds,
      })
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <Notification />
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>
          {`${user.name} logged in`}{' '}
          <Button text="logout" onClick={handleLogout} />
        </p>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <h2>create new</h2>
          <BlogForm />
        </Togglable>
        <br />
        <Blogs />
      </div>
    )
  }
}

export default App
