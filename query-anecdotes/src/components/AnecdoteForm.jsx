import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdotes'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificationDispatch({
        type: 'SET',
        payload: `anecdote ${newAnecdote.content} added`,
      })
      setTimeout(() => {
        notificationDispatch({ type: 'REMOVE' })
      }, 5000)
    },
    onError: () => {
      notificationDispatch({
        type: 'SET',
        payload: 'too short anecdote, must have length 5 or more',
      })
      setTimeout(() => {
        notificationDispatch({ type: 'REMOVE' })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
