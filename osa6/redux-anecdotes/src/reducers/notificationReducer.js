import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Default notification text!'

const notificationSlice = createSlice({ 
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      console.log('CREATE NOTIFICATION')
      const content = action.payload
      state.push({
        content,
      })
    }
  },
})

export const { createNotification } = notificationSlice.actions
export default notificationSlice.reducer