import { useDispatch, useSelector } from 'react-redux'

const Anecdotes = () => {
  const vote = (id) => {
    dispatch({ type: 'VOTE', id: id })
  }
  
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotes