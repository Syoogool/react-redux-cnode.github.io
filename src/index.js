import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
// import createHistory from 'history/createBrowserHistory'
import createHistory from 'history/createHashHistory'
import FastClick from 'fastclick'
import { auth } from './actions/auth'
import App from './containers/App/App'
import rootReducer from './reducers/'
// import registerServiceWorker from './registerServiceWorker'

const middleware = [ thunk ]
// redux-devtoll
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const history = createHistory()
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), ...middleware))
)

// 刷新时重新同步用户登陆信息
if (window.sessionStorage.length > 0) {
  const token = JSON.parse(window.sessionStorage.getItem('auth'))
  store.dispatch(auth(token))
}

// 处理点击移动端300ms延迟
window.addEventListener('load', () => {
  FastClick.attach(document.body)
})

ReactDOM.render(
  <Provider store={store}>
    {/* ConnectedRouter 是react-router-redux提供的同步状态与路由的组件，类似与增强的Router组件 */}
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

// registerServiceWorker()
