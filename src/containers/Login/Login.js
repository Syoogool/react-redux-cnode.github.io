import React from 'react'
import { connect } from 'react-redux'
import { auth } from '../../actions/auth'
import { Form, Button } from 'semantic-ui-react'

class LoginContainer extends React.Component {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
  }
  submit () {
    const { dispatch } = this.props
    const { value } = this.refs.token
    const state = this.props.history.location.state
    // 上一页面导航路由

    const fromURL = state ? state.from.pathname : '/'

    dispatch(auth(value, fromURL))
  }

  render () {
    return (
      <div>
        <h2>登陆页面</h2>
        {/* 非受控组件 ref获取表单值 */}
        <Form>
          <Form.Field>
            <label>Token</label>
            <input type='text' ref='token' defaultValue='' placeholder='token' />
          </Form.Field>
          <Button type='submit' onClick={this.submit}>登陆</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { auth } = state
  const { isFetching, isAuthenticated, token } = auth
  // session缓存用户登陆信息
  window.sessionStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated))
  window.sessionStorage.setItem('auth', JSON.stringify(token))

  return {
    isAuthenticated,
    isFetching
  }
}

const Login = connect(mapStateToProps)(LoginContainer)

export default Login
