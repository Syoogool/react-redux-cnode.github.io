import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.ul`
  width: 100%;
  height: 40px;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  left: 0;
  bottom: 0;
  border: 1px solid red;
  list-style: none;
  margin: 0;
  padding: 0;
  background: #fff;
`
const Li = styled.li`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  border: 1px solid green;

`

const activeStyle = {
  background: 'red'
}

const Navbar = () => (
  <Nav>
    <Li><NavLink exact to='/' activeStyle={activeStyle}>首页</NavLink></Li>
    <Li><NavLink to='/create' activeStyle={activeStyle}>创建</NavLink></Li>
    <Li><NavLink to='/message' activeStyle={activeStyle}>消息</NavLink></Li>
    <Li><NavLink to='/my' activeStyle={activeStyle}>我的</NavLink></Li>
  </Nav>
)

export default Navbar
