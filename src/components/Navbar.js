import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

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
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #0e90d2;
`

const activeStyle = {
  color: 'palevioletred'
}

const Navbar = () => (
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

export default Navbar
