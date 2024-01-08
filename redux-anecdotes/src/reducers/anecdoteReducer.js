import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      return state.map((ann) =>
        ann.id === action.payload.id ? action.payload.anecdote : ann
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

export const { updateAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdotes = await anecdoteService.createNew(content)
  dispatch(appendAnecdote(newAnecdotes))
}

export const incrementVote = (id) => async (dispatch, getState) => {
  const anecdoteState = getState().anecdote
  const anecdote = anecdoteState.find((ann) => ann.id === id)
  const updated = await anecdoteService.incrementVote(id, anecdote)
  dispatch(updateAnecdote({ id, anecdote: updated }))
}

export default anecdoteSlice.reducer
