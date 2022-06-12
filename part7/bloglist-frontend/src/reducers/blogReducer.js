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
    removeFromBlogs(state, action) {
      const blogToBeRemovedId = action.payload
      const updatedBlogs = state.filter((blog) => blog.id !== blogToBeRemovedId)
      return updatedBlogs
    },
    replaceBlog(state, action) {
      const updatedBlog = action.payload
      const updatedBlogs = state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
      const sortedUpdatedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)
      return sortedUpdatedBlogs
    },
    addComment(state, action) {
      const addedComment = action.payload
      const updatedBlogs = state.map((blog) =>
        blog.id !== addedComment.blog
          ? blog
          : { ...blog, comments: blog.comments.concat(addedComment) }
      )
      return updatedBlogs
    },
  },
})

export const {
  setBlogs,
  appendBlogs,
  removeFromBlogs,
  replaceBlog,
  addComment,
} = blogSlice.actions

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

export const removeBlog = (blogToBeRemoved) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogToBeRemoved.id)
      dispatch(removeFromBlogs(blogToBeRemoved.id))
      dispatch(
        setNotification({
          successful: true,
          message: `Deleted ${blogToBeRemoved.title} by ${blogToBeRemoved.author}`,
          displaySeconds: 5,
        })
      )
    } catch (exception) {
      dispatch(
        setNotification({
          suffessful: false,
          message: `Was not able to delete the blog ${blogToBeRemoved.title} by ${blogToBeRemoved.author}`,
          displaySeconds: 5,
        })
      )
    }
  }
}

export const updateBlog = (updatedInfo) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(updatedInfo)
      dispatch(replaceBlog(updatedBlog))
    } catch (exception) {
      dispatch(
        setNotification({
          suffessful: false,
          message: 'Was not able to update the blog',
          displaySeconds: 5,
        })
      )
    }
  }
}

export default blogSlice.reducer
