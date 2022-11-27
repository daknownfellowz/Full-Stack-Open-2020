import { useSelector } from 'react-redux'
// import React from 'react'


// const Notification = ({ notificationMessage }) => {
const Notification = () => {

  const notificationMessage = useSelector(({ notificationMessage }) => {
    return notificationMessage
  })

  const notificationStyle = {
    color: 'green',
    backgroundColor: 'lightgrey',
    fontStyle: 'italic',
    fontSize: '20px',
    borderRadius: '5px',
    border: '2px solid green',
    padding: '10px',
    marginBottom: '10px'
  }

  if (notificationMessage === null || notificationMessage === '') {
    return null
  }

  return (
    <div style={notificationStyle}>
      {notificationMessage}
    </div>
  )
}

export default Notification