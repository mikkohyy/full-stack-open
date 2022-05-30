import { createSlice } from '@reduxjs/toolkit'

const initialState = { text: '', visible: false }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const newState = {
        text: action.payload,
        visible: true
      }
      return newState
    },
    hideNotification(state, action) {
      const newState = {
        text: '',
        visible: false
      }
      return newState
    }
  },
})

export const setNotification = (text, showTime) => {
  const displayTime = showTime * 1000
  return dispatch => {
    dispatch(showNotification(text))
    setTimeout(() => {
      dispatch(hideNotification())
    }, displayTime)
  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer