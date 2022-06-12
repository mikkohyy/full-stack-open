import React from 'react'
import { Button } from '@mui/material'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import BlogComments from './BlogComments'
import { useDispatch } from 'react-redux'
import BlogAddField from './CommentAddField'
import styled from 'styled-components'

const BlogInfoContainer = styled.div`
  font-size: 1.2em;
`

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
      <BlogInfoContainer>
        <span className="blog-url">{blog.url}</span>
        <br />
        <span className="blog-likes">
          {blog.likes} likes{' '}
          <Button
            onClick={addLikeToBlogAndUpdate}
            size="small"
            variant="outlined"
          >
            like
          </Button>
          <br />
        </span>
        <span className="blog-creator-name">
          added by {blog.user.name}
          <br />
        </span>
        <Button onClick={removeThisBlog} size="small" variant="outlined">
          remove
        </Button>
      </BlogInfoContainer>
      <h3>comments</h3>
      <BlogAddField blogId={blog.id} />
      <BlogComments comments={blog.comments} />
    </div>
  )
}

export default Blog
