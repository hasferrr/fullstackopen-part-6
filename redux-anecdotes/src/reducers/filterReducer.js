const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_WORD':
      return action.payload
    default:
      return state
  }
}

export const filterWord = (value) => {
  return {
    type: 'FILTER_WORD',
    payload: value,
  }
}

export default filterReducer
