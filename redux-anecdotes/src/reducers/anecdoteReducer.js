import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      return state.map((ann) =>
        ann.id === action.payload ? { ...ann, votes: ann.votes + 1 } : ann
      )
    },
    createAnecdote(state, action) {
      return [...state, asObject(action.payload)]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { incrementVote, createAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
