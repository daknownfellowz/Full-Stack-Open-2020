import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    console.log('anecdote separated no props with connect: ', event)

    const content = event.target.anecdote.value
    console.log('content is: ', content)
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`you added '${content}'`, 5)
  }

  return (
    <><h2>create new</h2>
    <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
    </form></>
  )
}

export default connect(
  null, 
  { createAnecdote, setNotification }
)(AnecdoteForm)