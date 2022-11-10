import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(({ notification }) => {
    console.log('notifikaatio palaa')
    return notification
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification