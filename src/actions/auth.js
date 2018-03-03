import axios from 'axios'
import { push } from 'react-router-redux'
import notifice from '../components/Notifice'

export const questAuth = token => ({
  type: 'QUEST_AUTH',
  isLogining: true,
  token
})

export const authSucess = (token, userInfo) => ({
  type: 'AUTH_SUCESS',
  userInfo,
  token
})

export const authFail = () => ({
  type: 'AUTH_FAIL'
})

export const auth = (token, fromURL) => dispatch => {
  const willToURL = fromURL

  dispatch(questAuth(token))
  axios.post(`https://cnodejs.org/api/v1/accesstoken?accesstoken=${token}`)
  .then(res => {
    notifice('登陆成功')
    dispatch(authSucess(token, res.data))
    // 登陆成功后导航到之前的路由页面,默认才是导航到首页
    dispatch(push(willToURL))
  })
  .catch(error => {
    if (error.response) {
      notifice(error.response.data.error_msg)
    } else {
      console.log('Error', error.message)
    }
    dispatch(authFail())
  })
}
