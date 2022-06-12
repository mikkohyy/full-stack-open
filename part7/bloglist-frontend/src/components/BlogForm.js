import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { TextField, Button } from '@mui/material'

const BlogForm = () => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      author,
      title,
      url,
    }

    setAuthor('')
    setTitle('')
    setUrl('')
    dispatch(addBlog(newBlog))
  }

  return (
    <form id="newBlogForm" onSubmit={addNewBlog}>
      <div>
        <TextField
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={handleTitleChange}
          label="title"
          size="small"
        />
      </div>
      <div>
        <TextField
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
          label="author"
          size="small"
        />
      </div>
      <div>
        <TextField
          id="url"
          type="text"
          value={url}
          name="Url"
          onChange={handleUrlChange}
          label="author"
          size="small"
        />
      </div>
      <Button id="create-button" size="small" variant="outlined" type="submit">
        create
      </Button>
    </form>
  )
}

export default BlogForm
