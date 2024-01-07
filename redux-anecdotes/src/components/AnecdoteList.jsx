import PropTypes from 'prop-types'

import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ content, votes, handleClick }) => {
  return (
    <>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </>
  )
}

Anecdote.propTypes = {
  content: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
}

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => dispatch(incrementVote(id))

  const sortAnecdotes = () =>
    anecdotes.map((ann) => ({ ...ann })).toSorted((a, b) => b.votes - a.votes)

  return (
    <>
      {sortAnecdotes(anecdotes).map((anecdote) => (
        <div key={anecdote.id}>
          <Anecdote
            content={anecdote.content}
            votes={anecdote.votes}
            handleClick={() => vote(anecdote.id)}
          />
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
