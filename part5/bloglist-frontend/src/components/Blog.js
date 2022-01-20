import React, { useState } from 'react'
import Button from './Button'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog }) => {
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

  const addLikeToBlogAndUpdate = () => {
    const likedBlog = {
      author: blog.author,
      id: blog.id,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user.id
    }

    updateBlog(likedBlog)
  }

  const removeThisBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog)
    }
  }

  const viewHideAdditionalInfo = () => {
    setViewText(!viewText)
    setShowAdditionalInfo(!showAdditionalInfo)
  }

  return (
    <div style={blogStyle}>
      <div>
        &quot;{blog.title}&quot; by {blog.author} <Button text={buttonText} onClick={viewHideAdditionalInfo} />
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        {blog.likes} <Button text="like" onClick={addLikeToBlogAndUpdate} /><br/>
        {blog.user.name}<br/>
        <Button text="remove" onClick={removeThisBlog}/>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog