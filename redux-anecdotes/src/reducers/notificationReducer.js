import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setVotedNotification(_, action) {
      return `you voted '${action.payload}'`
    },
    setAddedNotification(_, action) {
      return `you added '${action.payload}'`
    },
    removeNotification() {
      return null
    },
  },
})

export const {
  setVotedNotification,
  setAddedNotification,
  removeNotification,
} = notificationSlice.actions
export default notificationSlice.reducer
