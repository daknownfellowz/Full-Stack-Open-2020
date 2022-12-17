import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

let timeoutId

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      console.log('createNotification redux')
      const notication = action.payload
      return notication
    },
  },  
})

export const { createNotification, reset } = notificationSlice.actions

/* setNotification and vanish after delay */
/*
export const setNotification = (content, delay) => {
  return (dispatch) => {
    dispatch(createNotification(content))
    console.log('Previous message with timeoutId should be cleared before making new notification with timeout: ', timeoutId)
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => dispatch(createNotification(null)), delay * 1000)
  }
}*/

export default notificationSlice.reducer