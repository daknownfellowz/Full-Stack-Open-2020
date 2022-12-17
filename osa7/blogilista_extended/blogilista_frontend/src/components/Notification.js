import { useSelector } from 'react-redux'

const Notification = () => {

  const notificationMessage = useSelector((state) => state.notification)
  console.log('notificationMessage is: ', notificationMessage)

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
      {notificationMessage.message}
    </div>
  )
}

export default Notification

