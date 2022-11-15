import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    console.log('anecdote separated no props: ', event)

    const content = event.target.anecdote.value
    console.log('content is: ', content)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))    

    dispatch(setNotification(`you added '${content}'`, 5))
  }

  return (
    <><h2>create new</h2>
    <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
    </form></>
  )
}

export default AnecdoteForm