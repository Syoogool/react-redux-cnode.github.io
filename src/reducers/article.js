// article actions
import { REQUEST_ARTICLE, RECEIVE_SUCESS, RECEIVE_FAIL } from '../actions/article'

const article = (state = {
  replies: [],
  content: null,
  title: null,
  isFetching: false,
  author: {}
}, action) => {
  switch (action.type) {
    case REQUEST_ARTICLE:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_SUCESS:
      return {
        ...state,
        isFetching: false,
        ...action.data
      }
    case RECEIVE_FAIL:
      return {
        ...state
      }
    default:
      return state
  }
}

export default article
