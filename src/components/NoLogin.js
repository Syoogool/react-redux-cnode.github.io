import React from 'react'
import { Link } from 'react-router-dom'

const NoLogin = () => (
  <div>
    <p>你还未登陆，请先</p>
    <button><Link to='/login'>登陆</Link></button>
  </div>
)
export default NoLogin
