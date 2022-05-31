import anecdoteService from '../services/anecdotes'

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
    type: 'ADD_ANECDOTE',
    data: {
      newAnecdote: content
    }
  }
}

export const setAnecdotes = (anecdotes) => {
  return {
    type: 'SET_ANECDOTES',
    data: {
      anecdotes: anecdotes
    }
  }
}

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
      const updatedAnecdotes = state.concat(action.data.newAnecdote)
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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const updateAnecdoteVotes = content => {
  const votedAnecdote = { ...content, votes: content.votes + 1}
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(votedAnecdote)
    dispatch(voteAnecdote(updatedAnecdote.id))
  }
}

export default anecdoteReducer