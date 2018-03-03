import { combineReducers } from 'redux'
import { selectedTab, postsByTab } from './posts'
import auth from './auth.js'
import article from './article'
// 同步路由的reducer
import { routerReducer } from 'react-router-redux'
// 表单
import { reducer as formReducer } from 'redux-form'
import message from './message'

// 合并reducer
const rootReducer = combineReducers({
  selectedTab,
  postsByTab,
  article,
  auth,
  message,
  router: routerReducer,
  form: formReducer
})

export default rootReducer
