import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer';

const Form = (props) => {
  const add = async (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(anecdoteContent)
    props.setNotification(`added new anecdote: '${anecdoteContent}'`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

const ConnectedForm = connect(
  null,
  { createAnecdote, setNotification }
)(Form)

export default ConnectedForm