import { createSlice } from '@reduxjs/toolkit'

const initialState = { successful: null, message: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      console.log(action)
      const newState = {
        succesful: true,
        message: 'moi',
      }
      return newState
    },
  },
})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer
