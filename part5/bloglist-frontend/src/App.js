import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const loggedInUser = await loginService.login({
        username, password
      })
      setUser(loggedInUser)
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (expection) {
      console.log('Wrong credentials')
    }
  }

  if (user === null) {
    return(
      <div>
        <h2>Log in to the application</h2>
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
        <p>{`${user.name} logged in`}</p>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    )
  }
}

export default App