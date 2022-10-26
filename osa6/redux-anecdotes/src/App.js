import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotesOriginal = useSelector(state => state)
  // Sort anecdotes by votes (6.5: anekdootit, step3)
  const anecdotes = anecdotesOriginal.sort((a, b) => b.votes - a.votes)

  const dispatch = useDispatch()

  const createAnecdote = (content) => { return {
      type: 'NEW_ANECDOTE',
      data: {
        content,        
        id: generateId(),
        votes: 0
      }
    }
  }

  const createVote = (id) => {
    return {
      type: 'VOTE',
      data: id
    }
  }  

  const vote = (id) => {
    console.log('vote', id)
    dispatch(createVote(id))
  } 

  const addAnecdote = (event) => {
    event.preventDefault()

    console.log('anecdote', event)
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))  

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App