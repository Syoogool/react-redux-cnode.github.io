import {
  SELECT_TAB,
  INVALIDATE_POSTS,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions/'

export const selectedTab = (state = 'all', action) => {
  switch (action.type) {
    case SELECT_TAB:
      return action.tab
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  pageCount: 1,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_POSTS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
        pageCount: action.pageCount
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: [...state.items, ...action.posts],
        pageCount: action.pageCount,
        lastUpdated: action.receiveAt
      }
    default:
      return state
  }
}

export const postsByTab = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_POSTS:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.tab]: posts(state[action.tab], action)
      }
    default:
      return state
  }
}
