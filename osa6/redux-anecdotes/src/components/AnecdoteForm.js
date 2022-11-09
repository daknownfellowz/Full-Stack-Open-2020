import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    console.log('anecdote separated: ', event)

    const content = event.target.anecdote.value
    console.log('content is: ', content)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
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