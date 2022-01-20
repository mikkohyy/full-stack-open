import React, { useState } from 'react'
import Button from './Button'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      author,
      title,
      url
    }
    createBlog(newBlog)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return(
    <form onSubmit={addBlog}>
      <div>
        title: <input type="text" value={title} name="Title" onChange={handleTitleChange} />
      </div>
      <div>
        author: <input type="text" value={author} name="Author" onChange={handleAuthorChange} />
      </div>
      <div>
        url: <input type="text" value={url} name="Url" onChange={handleUrlChange} />
      </div>
      <Button text="create" />
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm