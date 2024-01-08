import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'notification',
  reducers: {
    notificationMessage(_, action) {
      return action.payload
    },
  },
})

export const { notificationMessage } = notificationSlice.actions
export default notificationSlice.reducer
