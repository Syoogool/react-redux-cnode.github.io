import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loader from '../../components/Loader'
// 代码分割的异步组件
import asyncComponent from '../../components/AsyncComponent'
import './App.css'
import 'semantic-ui-css/semantic.min.css'

// 动态引入组件
const AsyncHome = asyncComponent(() => import('../Home/Home'))
const AsyncLogin = asyncComponent(() => import('../Login/Login'))
const AsyncCreate = asyncComponent(() => import('../Create/Create'))
// const AsyncMy = asyncComponent(() => import('../My/My'))

const AsyncMy = Loadable({
  loader: () => import('../My/My'),
  loading: Loader,
  delay: 200
})

const AsyncMessage = asyncComponent(() => import('../Message/Message'))
const AsyncDetails = asyncComponent(() => import('../Details/Details'))

// 自定义需要认证的PrivateRoute（配合redux）
class PrivateRouteContainer extends React.Component {
  render () {
    const {
      isAuthenticated,
      component: Component,
      ...props
    } = this.props
   
    // 重定向到登陆页面的提示信息
    // window.confirm('你确定登陆么？')
    return (
      <Route
        {...props}
        render={props =>
          isAuthenticated
          ? <Component {...props} />
          : (
            <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
          )
        }
      />
    )
  }
}

const PrivateRoute = connect(state => { 
  const isAuthenticated = state.auth.isAuthenticated 
    || JSON.parse(window.sessionStorage.getItem('isAuthenticated'))
  return {
    isAuthenticated: isAuthenticated,
    userInfo: state.auth.userInfo
  }
})(PrivateRouteContainer)

class App extends Component {
  componentDidMount () {
    
  }

  render () {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={ AsyncHome } />
          <Route path='/create' component={ AsyncCreate } />
          <PrivateRoute path='/message' component={ AsyncMessage } />
          <PrivateRoute path='/my' component={ AsyncMy } />
          <Route path='/topic/:id' component={ AsyncDetails } />
          <Route path='/login' component={ AsyncLogin } />
          <Route path='/topic/share' render={() => <div>share page</div>} />
        </Switch>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   const { selectedTab } = state

//   return { selectedTab }
// }
// App被connect包裹底部路由导航失效
// export default connect(App)
export default App

