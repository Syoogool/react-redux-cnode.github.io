import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  position: fixed;
  height: 50px;
  box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
  border: 1px solid rgba(34,36,38,.15);
  background: #fff;
  z-index: 1000;
`
const H3 = styled.h3`
  display: inline-block;
  margin-top: 0;
  margin-left: calc(50% - 33px);
  transform: translateX(-50%);
`

const HeaderNav = props =>
  <Div>
    <i className='teal inverted angle left icon big' onClick={props.goBack} />
    <H3>{ props.title }</H3>
  </Div>

export default HeaderNav
