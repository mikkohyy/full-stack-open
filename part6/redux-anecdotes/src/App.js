import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Anecdotes from './components/AnecdoteList'
import Form from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  const visible = useSelector(state => state.notification.visible)

  return (
    <div>
      {visible && <Notification />}
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdotes />
      <Form />
    </div>
  )
}

export default App