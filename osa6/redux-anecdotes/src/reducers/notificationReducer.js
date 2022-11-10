import { createSlice } from '@reduxjs/toolkit'

const initialState = '' // 'Default notification text!'

const notificationSlice = createSlice({ 
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      console.log('CREATE NOTIFICATION: ', action)
      const notication = action.payload
      return notication
    },
    reset(state, action) {
        return null;
    },
  },
})

export const { createNotification, reset } = notificationSlice.actions

/* setNotification and vanish after delay */
export const setNotification = (content, delay) => {
    return (dispatch) => {
      dispatch(createNotification(content));
      setTimeout(() => {
        dispatch(reset());
      }, delay * 1000);
    };
  };


export default notificationSlice.reducer