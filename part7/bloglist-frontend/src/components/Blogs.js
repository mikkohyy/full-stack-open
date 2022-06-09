import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, handleUpdateBlog, handleRemoveBlog }) => {
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
