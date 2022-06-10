import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const Blogs = ({ handleUpdateBlog, handleRemoveBlog }) => {
  const blogs = useSelector((state) => state.blogs)
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={handleUpdateBlog}
          removeBlog={handleRemoveBlog}
        />
      ))}
    </div>
  )
}

export default Blogs
