import React, { useState } from 'react'
import Button from './Button'

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderColor: 'lightgray',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [viewText, setViewText] = useState(true)
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)

  const buttonText = viewText ? 'view' : 'hide'
  const showWhenVisible = { display: showAdditionalInfo ? '' : 'none' }

  const viewHideAdditionalInfo = () => {
    setViewText(!viewText)
    setShowAdditionalInfo(!showAdditionalInfo)
  }

  return (
    <div style={blogStyle}>
      <div>
        "{blog.title}" by {blog.author} <Button text={buttonText} onClick={viewHideAdditionalInfo} />
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        {blog.likes} <Button text="like" /><br/>
        {blog.user.name}<br/>
      </div>
    </div>
  )
}  

export default Blog