import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersWithBlogN } from '../reducers/usersReducer'

const UsersView = () => {
  const dispatch = useDispatch()
  const usersWithBlogsN = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUsersWithBlogN())
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {usersWithBlogsN.map((user) => (
            <tr key={user.name}>
              <td>{user.name}</td>
              <td>{user.nOfBlogs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView
