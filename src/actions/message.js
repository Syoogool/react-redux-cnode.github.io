import axios from 'axios'

export const REQUEST_MESSAGE = 'REQUEST_MESSAGE'
export const RECEIVE_SUCCES = 'RECEIVE_SUCCES'
export const RECEIVE_FAIL = 'RECEIVE_FAIL'
export const RECEIVE_COUNT = 'RECEIVE_COUNT'
export const RECEIVE_COUNT_SUCCESS = 'RECEIVE_COUNT_SUCCESS'

export const requstMessage = json => ({
  type: REQUEST_MESSAGE,
  json
})

export const receiveSucces = json => ({
  type: RECEIVE_SUCCES,
  json
})

export const receiveFail = err => ({
  type: RECEIVE_FAIL,
  err
})

export const fetchMessage = token => dispatch => {
  dispatch(requstMessage(token))
  const url = 'https://cnodejs.org/api/v1/messages'

  return axios.get(url, {
    params: {
      accesstoken: token
    }
  })
    .then(res => {
      dispatch(receiveSucces(res.data.data))
    })
    .catch(error => {
      console.log(error)
    })
}

const receiveCountSuccess = json => ({
  type: RECEIVE_COUNT_SUCCESS,
  json
})

export const fetchMessageCount = token => dispatch => {
  const url = 'https://cnodejs.org/api/v1/message/count'

  return axios.get(url, {
    params: {
      accesstoken: token
    }
  })
  .then(res => {
    dispatch(receiveCountSuccess(res.data.data))
  })
  .catch(err => {
    console.log(err)
  })
}
