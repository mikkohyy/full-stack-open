import React, { useState, useEffect } from 'react'
import Button from './components/Button'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsersView from './components/UsersView'
import blogService from './services/blogs'
import usersService from './services/users'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUserStore, clearUserStore } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserStore(user))
      blogService.setToken(user.token)
    }
  }, [])

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

      dispatch(setUserStore(loggedInUser))
      setUsername('')
      setPassword('')
      notifyUser(`logged in ${loggedInUser.name}`, true, 5)
    } catch (expection) {
      notifyUser('Wrong username or password', false, 5)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUserStore())
    notifyUser(`logged out ${user.name}`, true, 5)
    blogService.setToken(null)
    usersService.setToken(null)
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
        <p>{`${user.name} logged in`}</p>
        <p>
          <Button text="logout" onClick={handleLogout} />
        </p>
        <Router>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/users" element={<UsersView />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App
