import React from 'react'
import Button from './Button'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import BlogComments from './BlogComments'
import { useDispatch } from 'react-redux'
import BlogAddField from './CommentAddField'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const addLikeToBlogAndUpdate = () => {
    const likedBlog = {
      author: blog.author,
      id: blog.id,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user.id,
      comments: blog.comments,
    }

    dispatch(updateBlog(likedBlog))
  }

  const removeThisBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} written by ${blog.author}`)) {
      dispatch(removeBlog(blog))
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <div className="blog-info">
        <h2>
          &quot;{blog.title}&quot; by {blog.author}{' '}
        </h2>
      </div>
      <span className="blog-url">{blog.url}</span>
      <br />
      <span className="blog-likes">
        {blog.likes} likes{' '}
        <Button text="like" onClick={addLikeToBlogAndUpdate} />
        <br />
      </span>
      <span className="blog-creator-name">
        added by {blog.user.name}
        <br />
      </span>
      <Button text="remove" onClick={removeThisBlog} />
      <h3>comments</h3>
      <BlogAddField blogId={blog.id} />
      <BlogComments comments={blog.comments} />
    </div>
  )
}

export default Blog
