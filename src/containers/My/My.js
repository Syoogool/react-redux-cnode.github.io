import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { authFail } from '../../actions/auth'
import Navbar from '../../components/Navbar'

class HomeContainer extends React.Component {
  // 退出登陆 同时清除sessionStorage
  logout () {
    const { dispatch } = this.props
    dispatch(authFail())
    dispatch(push('/login'))
  }

  render () {
    const { token, userInfo } = this.props
    return (
      <div className='home'>
        <h1>my page</h1>
        <img src={userInfo.avatar_url} alt={userInfo.loginname} />
        <p>{userInfo.loginname}</p>
        <p>你的token: {token}</p>

        <button onClick={this.logout.bind(this)}>退出登陆</button>
        <Navbar />
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  const { auth } = state
  const { userInfo, token } = auth

  return {
    token,
    userInfo
  }
}

const Home = connect(mapStateToProps)(HomeContainer)

export default Home
