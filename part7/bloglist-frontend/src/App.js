import { Container, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsersView from './components/UsersView'
import UserBlogs from './components/UserBlogs'
import NavigationBar from './components/NavigationBar'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUserStore, clearUserStore } from './reducers/userReducer'
import { Routes, Route, useMatch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

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

  const match = useMatch('blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

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
      <Container>
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
      </Container>
    )
  } else {
    return (
      <Container>
        <div>
          <Notification />
          <NavigationBar />
          <h2>blog app</h2>
          <p>
            <Button
              text="logout"
              onClick={handleLogout}
              variant="outlined"
              size="small"
            >
              logout
            </Button>
          </p>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs/:id" element={<Blog blog={blog} />} />
            <Route path="/users" element={<UsersView />} />
            <Route path="/users/:id" element={<UserBlogs />} />
          </Routes>
        </div>
      </Container>
    )
  }
}

export default App
