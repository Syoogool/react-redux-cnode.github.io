import {
  SELECT_TAB,
  REQUEST_POSTS,
  INVALIDATE_POSTS,
  RECEIVE_POSTS
} from '../constants/topic'

export const selectTab = tab => ({
  type: SELECT_TAB,
  tab
})

export const requestPosts = (tab, pageCount) => ({
  type: REQUEST_POSTS,
  tab,
  pageCount
})

export const invalidatePosts = tab => ({
  type: INVALIDATE_POSTS,
  tab
})

export const receivePosts = (tab, pageCount, json) => ({
  type: RECEIVE_POSTS,
  tab,
  pageCount,
  posts: json.data,
  receiveAt: Date.now()
})

// 发起请求action
const fetchPosts = (tab, pageCount) => dispatch => {
  dispatch(requestPosts(tab, pageCount))
  return fetch(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${pageCount}`)
    .then(response => response.json())
    .then(json => {
      dispatch(receivePosts(tab, pageCount, json))
    })
}

export const fetchPostsIfNeeded = (tab, pageCount) => (dispatch, getState) => {
  return dispatch(fetchPosts(tab, pageCount))
}
