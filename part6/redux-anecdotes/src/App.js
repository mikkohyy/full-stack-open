import Anecdotes from './components/AnecdoteList'
import Form from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Anecdotes />
      <Form />
    </div>
  )
}

export default App