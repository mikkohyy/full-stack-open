import React, { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blogs from './Blogs'

const BlogList = () => {
  const blogFormRef = useRef()
  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm />
      </Togglable>
      <br />
      <Blogs />
    </div>
  )
}

export default BlogList
