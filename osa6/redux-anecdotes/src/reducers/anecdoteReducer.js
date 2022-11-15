import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = []

const generateId = () =>
Number((Math.random() * 1000000).toFixed(0))

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

export const { createAnecdote, createVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer