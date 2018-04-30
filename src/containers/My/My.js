import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Image, Button, Statistic } from 'semantic-ui-react'
import notifice from '../../components/Notifice'
import { authFail } from '../../actions/auth'
import Navbar from '../../components/Navbar'
import HeaderNav from '../../components/HeaderNav'
import BaseContent from '../../components/BaseContent'

class HomeContainer extends React.Component {
  // 退出登陆 同时清除sessionStorage
  logout () {
    const { dispatch } = this.props
    dispatch(authFail())
    notifice('退出成功')
    dispatch(push('/login'))
  }

  render () {
    const { token, userInfo } = this.props
    return (
      <div className='home'>
        <HeaderNav title='我的主页' />
        <BaseContent>
          <Image
            src={userInfo.avatar_url}
            alt={userInfo.loginname}
            circular
            centered
            />
          <Statistic.Group>
            <Statistic size='mini' horizontal>
              <Statistic.Label>用户名: </Statistic.Label>
              <Statistic.Value>{userInfo.loginname}</Statistic.Value>
            </Statistic>
          </Statistic.Group>

          <Button onClick={this.logout.bind(this)}>退出登陆</Button>
        </BaseContent>
        <Navbar />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { auth } = state
  const { userInfo, token } = auth

  return {
    token,
    userInfo
  }
}

const Home = connect(mapStateToProps)(HomeContainer)

export default Home
