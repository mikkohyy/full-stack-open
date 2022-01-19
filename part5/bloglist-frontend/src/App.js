import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Button from './components/Button'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [author, setAuthor] = useState('')
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')

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

  const handleCreateNote = async (event) => {
    event.preventDefault()
    const newNote = {
      title,
      author,
      url
    }
    try {
      const response = await blogService.create(newNote)
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(response))
    } catch(expection) {
      console.log('Operation failed')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const loggedInUser = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedInUser)
      )

      blogService.setToken(loggedInUser.token)

      setUser(loggedInUser)
      setUsername('')
      setPassword('')
    } catch (expection) {
      console.log('Wrong credentials')
    }

  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
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
          <p>{`${user.name} logged in`} <Button text="logout" onClick={handleLogout} /></p>
        <h2>create new</h2>
          <NoteForm 
            author={author}
            setAuthor={setAuthor}
            title={title}
            setTitle={setTitle}
            url={url}
            setUrl={setUrl}
            onSubmit={handleCreateNote}
          />
          <br/>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    )
  }
}

export default App