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


export const setAnecdotes = (anecdotes) => {
  return {
  type: "SET_ANECDOTES",
    data: {
      anecdotes: anecdotes
    }
  }
}

const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = []

const anecdoteReducer = (state = initialState, action) => {
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
    } case 'SET_ANECDOTES' : {
      const currentAnecdotes = action.data.anecdotes;
      return currentAnecdotes
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

export default anecdoteReducer