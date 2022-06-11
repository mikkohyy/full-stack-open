import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserBlogs = () => {
  const id = useParams().id
  const users = useSelector((state) => state.users)
  const user = users.find((user) => user.id === id)

  if (!user) {
    return null
  } else {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.title}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default UserBlogs
