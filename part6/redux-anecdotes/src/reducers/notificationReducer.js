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

let timeoutId = null;

export const setNotification = (text, showTime) => {
  const displayTime = showTime * 1000
  return dispatch => {
    timeoutId !== null && clearTimeout(timeoutId)
    dispatch(showNotification(text))
    timeoutId = setTimeout(() => {
      dispatch(hideNotification())
      timeoutId = null
    }, displayTime)
  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer