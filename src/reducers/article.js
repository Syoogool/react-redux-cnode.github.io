// article actions
import { REQUEST_ARTICLE, RECEIVE_SUCESS, RECEIVE_FAIL } from '../actions/article'
// 评论actions
import { POST_COMMENT, POST_SUCESS, POST_FAIL } from '../actions/addComment'

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
    case POST_SUCESS:
      return {
        ...state
      }
    default:
      return state
  }
}

export default article
