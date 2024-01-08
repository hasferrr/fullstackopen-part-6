import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      return state.map((ann) =>
        ann.id === action.payload ? { ...ann, votes: ann.votes + 1 } : ann
      )
    },
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { incrementVote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdotes = await anecdoteService.createNew(content)
  dispatch(appendAnecdote(newAnecdotes))
}

export default anecdoteSlice.reducer
