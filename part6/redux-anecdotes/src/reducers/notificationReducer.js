import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addAnecdote(state, action) {
      console.log('umm')
      return action.payload
    },
    voteAnecdote(state, action) {
      console.log('umm')
      return null
    }
  },
})

export const { addAnecdote, voteAnecdote } = notificationSlice.actions
export default notificationSlice.reducer