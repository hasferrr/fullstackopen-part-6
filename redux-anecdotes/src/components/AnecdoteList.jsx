import PropTypes from 'prop-types'

import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
  const anecdotes = useSelector(({ anecdote, filter }) => {
    if (filter === '') {
      return anecdote
    }
    return anecdote.filter((ann) =>
      ann.content.toLowerCase().includes(filter.toLowerCase())
    )
  })
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
            handleClick={() => {
              vote(anecdote.id)
              dispatch(setNotification('vote', anecdote.content, 5000))
            }}
          />
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
