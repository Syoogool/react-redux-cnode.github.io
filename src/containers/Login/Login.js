import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { auth } from '../../actions/auth'
import { Form, Button } from 'semantic-ui-react'

class LoginContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      length: 0
    }
    this.submit = this.submit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  submit () {
    const { dispatch } = this.props

    // String 类型refs(如下)不推荐使用 推荐使用回调函数式
    // const { value } = this.refs.token
    const { value } = this.input
    const state = this.props.history.location.state

    // 上一页面导航路由
    const fromURL = state ? state.from.pathname : '/'

    dispatch(auth(value, fromURL))
  }

  handleChange () {
    this.setState({
      length: this.input.value.trim().length
    })
  }

  render () {
    const submitClass = classNames({
      'disabled': this.state.length < 1
    })
    return (
      <div>
        <h2>登陆页面</h2>
        {/* 受控组件 ref获取表单值 */}
        <Form>
          <Form.Field>
            <label>Token</label>
            <input
              type='text'
              ref={(input) => { this.input = input }}
              defaultValue=''
              placeholder='token'
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button fluid primary type='submit' className={submitClass} onClick={this.submit}>登陆</Button>
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
