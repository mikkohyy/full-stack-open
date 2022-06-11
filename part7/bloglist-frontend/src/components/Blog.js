import React, { useState } from 'react'
import Button from './Button'
import PropTypes from 'prop-types'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

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
      user: blog.user.id,
    }

    dispatch(updateBlog(likedBlog))
  }

  const removeThisBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} written by ${blog.author}`)) {
      dispatch(removeBlog(blog))
    }
  }

  const viewHideAdditionalInfo = () => {
    setViewText(!viewText)
    setShowAdditionalInfo(!showAdditionalInfo)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div className="blog-info">
        &quot;{blog.title}&quot; by {blog.author}{' '}
        <Button text={buttonText} onClick={viewHideAdditionalInfo} />
      </div>
      <div className="additionalBlogInfo" style={showWhenVisible}>
        <span className="blog-url">{blog.url}</span>
        <br />
        <span className="blog-likes">
          {blog.likes} <Button text="like" onClick={addLikeToBlogAndUpdate} />
          <br />
        </span>
        <span className="blog-creator-name">
          {blog.user.name}
          <br />
        </span>
        <Button text="remove" onClick={removeThisBlog} />
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}
export default Blog
