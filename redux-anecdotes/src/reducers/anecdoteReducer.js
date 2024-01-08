import { createSlice } from '@reduxjs/toolkit'

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
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { incrementVote, createAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
