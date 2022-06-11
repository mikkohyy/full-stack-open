import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const Blogs = ({ handleUpdateBlog }) => {
  const blogs = useSelector((state) => state.blogs)
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={handleUpdateBlog} />
      ))}
    </div>
  )
}

export default Blogs
