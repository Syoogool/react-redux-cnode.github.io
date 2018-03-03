import {
  REQUEST_MESSAGE,
  RECEIVE_SUCCES,
  RECEIVE_FAIL,
  RECEIVE_COUNT_SUCCESS
} from '../actions/message'

const message = (state = {
  has_read_messages: [],
  hasnot_read_messages: [],
  isFetching: false,
  count: 0
}, action) => {
  switch (action.type) {
    case REQUEST_MESSAGE:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_SUCCES:
      return {
        ...state,
        ...action.json,
        isFetching: false
      }
    case RECEIVE_FAIL:
      return {
        ...state,
        isFetching: false,
        ...action.err
      }
    case RECEIVE_COUNT_SUCCESS:
      return {
        ...state,
        count: action.json
      }
    default:
      return {
        ...state
      }
  }
}

export default message
