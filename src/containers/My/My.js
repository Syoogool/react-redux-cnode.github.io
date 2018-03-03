import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import styled from 'styled-components'
import { authFail } from '../../actions/auth'
import Navbar from '../../components/Navbar'
import HeaderNav from '../../components/HeaderNav'

const Content = styled.div`
  padding-top: 50px;
`

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
        <HeaderNav title='我的主页' />
        <Content>
          <img src={userInfo.avatar_url} alt={userInfo.loginname} />
          <p>{userInfo.loginname}</p>
          <p>你的token: {token}</p>

          <button onClick={this.logout.bind(this)}>退出登陆</button>
        </Content>
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
