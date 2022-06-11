import usersService from '../services/users'
import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

export const getUsersWithBlogN = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    const usersWithBlogN = users.map((user) => ({
      ...user,
      nOfBlogs: user.blogs.length,
    }))
    const orderedUsers = usersWithBlogN.sort((a, b) => b.nOfBlogs - a.nOfBlogs)
    dispatch(setUsers(orderedUsers))
  }
}

export default usersSlice.reducer
