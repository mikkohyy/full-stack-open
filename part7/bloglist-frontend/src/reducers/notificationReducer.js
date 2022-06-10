import { createSlice } from '@reduxjs/toolkit'

const initialState = { successful: null, message: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const payload = action.payload
      const newState = {
        successful: payload.successful,
        message: payload.message,
      }
      return newState
    },
    hideNotification() {
      const newState = {
        successful: null,
        message: null,
      }
      return newState
    },
  },
})

export const setNotification = ({ successful, message, displaySeconds }) => {
  const displayTime = displaySeconds * 1000
  return (dispatch) => {
    dispatch(showNotification({ successful, message }))
    setTimeout(() => {
      dispatch(hideNotification())
    }, displayTime)
  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
