import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
      all: 1,
      average: 1,
      positive: 100
    })
  })

  test('stats are reseted', () => {
    const action = {
      type: 'RESET'
    }
    const state = {
      good: 6,
      ok: 2,
      bad: 1,
      all: 9,
      average: 0.56,
      positive: 66.67
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
      all: 0,
      average: 0,
      positive: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
      all: 1,
      average: 0,
      positive: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
      all: 1,
      average: -1,
      positive: 0
    })
  })

  test('multiple evaluations increase', () => {
    const firstAction = {
      type: 'GOOD'
    }
    const firstState = initialState
    deepFreeze(firstState)
    const firstNewState = counterReducer(firstState, firstAction)
    
    const secondAction = {
      type: 'GOOD'
    }

    const secondState = firstNewState
    deepFreeze(secondState)
    const secondNewState = counterReducer(secondState, secondAction)
    
    const thirdAction = {
      type: 'OK'
    }
    const thirdState = secondNewState
    deepFreeze(thirdState)
    const thirdNewState = counterReducer(thirdState, thirdAction)
    
    expect(thirdNewState).toEqual({
      good: 2,
      ok: 1,
      bad: 0,
      all: 3,
      average: 0.67,
      positive: 66.67
    })    
  })

  test('all, average and positive are counted right', () => {
    const action = {
      type: 'OK'
    }

    const state = {
      good: 6,
      ok: 2,
      bad: 1,
      all: 9,
      average: 0.56,
      positive: 66.67
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
  
    expect(newState).toEqual({
      good: 6,
      ok: 3,
      bad: 1,
      all: 10,
      average: 0.5,
      positive: 60
    })    
  })
})