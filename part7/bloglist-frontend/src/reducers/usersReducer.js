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
      user: user.name,
      nOfBlogs: user.blogs.length,
    }))
    dispatch(setUsers(usersWithBlogN))
  }
}

export default usersSlice.reducer
