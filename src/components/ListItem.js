import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

class ListItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      val: 'test'
    }
  }

  componentDidMount () {
    console.log(this.props)
  }

  render () {
    return (
      <div>
        <Link to='/topic/details/test'>文章一</Link>
        <Link to='/topic/details/test'>文章2</Link>
        <Navbar />
      </div>
    )
  }
}

export default ListItem
