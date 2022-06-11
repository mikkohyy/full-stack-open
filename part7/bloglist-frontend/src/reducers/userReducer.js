import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserStore(state, action) {
      return action.payload
    },
    clearUserStore() {
      return null
    },
  },
})

export const { clearUserStore, setUserStore } = userSlice.actions

export default userSlice.reducer
