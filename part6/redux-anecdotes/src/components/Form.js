import { useSelector, useDispatch } from 'react-redux'

const Form = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({ type: 'ADD_ANECDOTE', content: newAnecdote })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default Form