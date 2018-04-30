import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  position: fixed;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
  border-bottom: 1px solid rgba(34,36,38,.15);
  background: #fff;
  z-index: 1000;
`
// 利用styled 的 props动态计算属性值
const H2 = styled.h2`
  display: inline-block;
  margin-top: 0;
  margin-left: ${props => props.icon ? 'calc(50% - 33px)' : 'calc(50%)'};
  transform: translateX(-50%);
`

const HeaderNav = props => {
  const goBack = () => props.history.goBack()

  return (
    <Div>
      { props.icon
        ? <i className='teal inverted angle left icon big' onClick={goBack} />
        : ''
      }
      <H2 icon={props.icon}>{ props.title }</H2>
    </Div>
  )
}

export default HeaderNav
