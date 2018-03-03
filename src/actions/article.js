import axios from 'axios'
export const REQUEST_ARTICLE = 'REQUEST_ARTCLE'
export const RECEIVE_SUCESS = 'RECEIVE_SUCESS'
export const RECEIVE_FAIL = 'RECEIVE_FAIL'

export const requestArticle = id => ({
  type: REQUEST_ARTICLE,
  id
})

export const receiveSucess = (id, json) => ({
  type: RECEIVE_SUCESS,
  data: json,
  receiveAt: Date.now()
})

export const receiveFail = (id, err) => ({
  type: RECEIVE_FAIL,
  error: err,
  receiveAt: Date.now()
})

const fetchArticle = id => dispatch => {
  dispatch(requestArticle(id))
  const url = `https://cnodejs.org/api/v1/topic/${id}`
  return axios.get(url)
    .then(res => {
      // 因为少写了一个参数id 浪费了好多时间，不过这引出了探索异步action的一些解决方案问题（redux-thunk redux-promis redux-soga)
      dispatch(receiveSucess(id, res.data.data))
    })
}

export const fetchPostsIfNeeded = id => dispatch => {
  return dispatch(fetchArticle(id))
}
