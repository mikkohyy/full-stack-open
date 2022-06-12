import React from 'react'
import Button from './Button'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

const BlogNew = ({ blog }) => {
  const dispatch = useDispatch()
  const id = useParams().id

  console.log(id)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderColor: 'lightgray',
    borderWidth: 1,
    marginBottom: 5,
  }

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

  return (
    <div className="blog" style={blogStyle}>
      <div className="blog-info">
        &quot;{blog.title}&quot; by {blog.author}{' '}
      </div>
      <div className="additionalBlogInfo">
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

export default BlogNew
