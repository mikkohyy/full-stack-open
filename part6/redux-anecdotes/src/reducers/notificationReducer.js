import { createSlice } from '@reduxjs/toolkit'

const initialState = "unintelligent notification message"

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notifyUser(state, action) {
      return "notifying user";
    }
  }
})

export default notificationSlice.reducer