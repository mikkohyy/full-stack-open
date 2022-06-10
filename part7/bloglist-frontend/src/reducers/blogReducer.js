import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlogs(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setBlogs, appendBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const unorderedBlogs = await blogService.getAll()
    const blogs = unorderedBlogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.create(newBlog)
      dispatch(appendBlogs(response))
      dispatch(
        setNotification({
          successful: true,
          message: `a new blog ${response.title} by ${response.author} was added`,
          displaySeconds: 5,
        })
      )
    } catch (exception) {
      dispatch(
        setNotification({
          successful: false,
          message: 'adding the blog failed',
          displaySeconds: 5,
        })
      )
    }
  }
}

export default blogSlice.reducer
