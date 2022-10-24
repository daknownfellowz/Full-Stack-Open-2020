const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const changedState = {
        ...state,
        good: state.good + 1
      }
      return changedState
    case 'OK':
      const changedState2 = {
        ...state,
        ok: state.ok + 1
      }
      return changedState2
    case 'BAD':
      const changedState3 = { 
        ...state,
        bad: state.bad + 1
      }
      return changedState3
    case 'ZERO':
      const changedState4 = { 
        ...state,
        good: 0,
        ok: 0,
        bad: 0
      }
      return changedState4      
    default: return state
  }
  
}

export default counterReducer