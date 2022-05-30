import { useDispatch, useSelector } from 'react-redux'
import { updateAnecdoteVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleClick(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const vote = (anecdote) => {
    dispatch(updateAnecdoteVotes(anecdote))
    dispatch(setNotification(`voted: '${anecdote.content}'`, 5))
  }
  
  const dispatch = useDispatch()
  const filteredWord = useSelector(state => state.filter);
  const filteredAnecdotes = useSelector(state => state.anecdotes
    .filter((anecdote) => anecdote.content.includes(filteredWord)))
  const anecdotes = filteredAnecdotes.sort((a, b) => { return b.votes - a.votes })

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      )}
    </div>
  )
}

export default Anecdotes