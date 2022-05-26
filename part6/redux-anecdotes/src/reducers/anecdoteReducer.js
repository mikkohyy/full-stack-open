export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

export const addAnecdote = (content) => {
  return {
    type: "ADD_ANECDOTE",
    data: {
      content: content,
      votes: 0,
      id: getId()
    }
  }
}

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('action', action)
  console.log('state now: ', state)
  switch(action.type) {
    case 'VOTE': {
      const updatedState = addVote(action.data.id, state)
      return updatedState
    }
    case 'ADD_ANECDOTE': {
      const updatedAnecdotes = state.concat(action.data)
      return updatedAnecdotes
    }
    default:
      return state
  }
}

const addVote = (id, anecdotes) => {
  const oldAnecdote = anecdotes.find(anecdote => anecdote.id === id)
  const updatedAnecdote = { ...oldAnecdote, votes: oldAnecdote.votes + 1 }
  
  const updatedAnecdotes = anecdotes.map(anecdote =>
    anecdote.id !== id ? anecdote : updatedAnecdote
  )

  return updatedAnecdotes
}

export default reducer