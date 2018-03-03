import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { fetchMessageCount } from '../actions/message'

const Nav = styled.ul`
  display: flex;
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  flex-direction: row;
  justify-content: flex-start;
  left: 0;
  bottom: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid #999;
  background: #fff;
`
const Li = styled.li`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`
const StyledNavLink = styled(NavLink)`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #0e90d2;
`
const StyledMessage = styled.span`
  position: absolute;
  top: 10%;
  left: 50%;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: red;
  color: #fff;
  z-index: 10
`

const activeStyle = {
  color: 'palevioletred'
}

class Navbar extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props
    const { token } = this.props.auth

    if (token) {
      dispatch(fetchMessageCount(token))
    }
  }

  render () {
    const { count } = this.props.message
    return (
      <Nav>
        <Li>
          <StyledNavLink exact to='/' activeStyle={activeStyle}>
            <Icon name='home' />
            <span>首页</span>
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to='/create' activeStyle={activeStyle}>
            <Icon name='write square' />
            <span>创建</span>
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to='/message' activeStyle={activeStyle}>
            { count > 0 ? <StyledMessage>{ count }</StyledMessage> : ''}
            <Icon name='bell outline' />
            <span>消息</span>
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to='/my' activeStyle={activeStyle}>
            <Icon name='user circle' />
            <span>我的</span>
          </StyledNavLink>
        </Li>
      </Nav>
    )
  }
}

const mapStateToProps = state => {
  const { auth, message } = state

  return {
    auth,
    message
  }
}
export default connect(mapStateToProps)(Navbar)
