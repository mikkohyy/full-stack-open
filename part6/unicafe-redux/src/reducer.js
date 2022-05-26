const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  all: 0,
  average: 0,
  positive: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD': {
      const newState = { ...state, good: state.good + 1, all: state.all + 1 }
      const allUpdatedNewState = {
        ...newState,
        average: getAverage(newState),
        positive: getPositivesFraction(newState)
      }
      return allUpdatedNewState
    } case 'OK': {
      const newState = { ...state, ok: state.ok + 1, all: state.all + 1 }
      const allUpdatedNewState = {
        ...newState,
        average: getAverage(newState),
        positive: getPositivesFraction(newState)
      }
      return allUpdatedNewState
    } case 'BAD': {
      const newState = { ...state, bad: state.bad + 1, all: state.all + 1 }
      const allUpdatedNewState = {
        ...newState,
        average: getAverage(newState),
        positive: getPositivesFraction(newState)
      }
      return allUpdatedNewState
    } case 'ZERO':
      return state
    default: return state
  }
  
}

const getAverage = (source) => {
  const score = (1 * source.good) + (-1 * source.bad)
  const average = score / source.all

  const roundedAverage = Math.round(average * 100) / 100

  return roundedAverage;
}

const getPositivesFraction = (source) => {
  const positivesFraction = source.good / source.all * 100
  const roundedPositivesFraction = Math.round(positivesFraction * 100) / 100

  return roundedPositivesFraction
}

export default counterReducer