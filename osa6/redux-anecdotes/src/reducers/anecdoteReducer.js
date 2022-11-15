import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({ 
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      console.log('CREATE ANECDOTE')
      const newAnecdote = action.payload
      state.push(newAnecdote)
    },
    createVote(state, action) {
      console.log('CREATE VOTE')
      const id = action.payload
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      state.push(changedAnecdote)
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    console.log('createAnecdote is new')
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const createVote = content => {
  return async dispatch => {
    console.log('createVote update id: ', content)
    const response = await anecdoteService.updateVotes(content)
    console.log('Updated data: ', response)
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))    
  }
}

export const { setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer