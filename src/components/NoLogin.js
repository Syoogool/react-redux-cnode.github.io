import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

const H3 = styled.h3`
  text-align: center;
  padding-top: 50px;
`
const NoLogin = () => (
  <div>
    <H3>
      你还未登陆，请先&nbsp;&nbsp;
      <Button><Link to='/login'>登陆</Link></Button>
    </H3>
  </div>
)
export default NoLogin
