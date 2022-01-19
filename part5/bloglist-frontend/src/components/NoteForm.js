import React from 'react'
import Button from './Button'

const NoteForm = ({ author, setAuthor, url, setUrl, title, setTitle, onSubmit}) => {

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  
  return(
    <form onSubmit={onSubmit}>
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

export default NoteForm