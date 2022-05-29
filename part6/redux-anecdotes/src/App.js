import { useSelector } from 'react-redux'
import Anecdotes from './components/AnecdoteList'
import Form from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
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