import AnecdoteForm from "./components/AnecdoteForm";
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotesOriginal = useSelector(state => state)
  // Sort anecdotes by votes (6.5: anekdootit, step3)
  const anecdotes = anecdotesOriginal.sort((a, b) => b.votes - a.votes)

  const dispatch = useDispatch()

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

      <AnecdoteForm />
      
    </div>
  )
}

export default App