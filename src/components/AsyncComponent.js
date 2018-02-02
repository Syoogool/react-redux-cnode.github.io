import React, { Component } from 'react'
// see: http://www.wukai.me/2017/09/25/react-router-v4-code-splitting/

export default function asyncComponent (importComponent) {
  class AsyncComponent extends Component {
    constructor (props) {
      super(props)
      this.state = {
        component: null
      }
    }
    async componentDidMount () {
      const { default: component } = await importComponent()
      this.setState({
        component: component
      })
    }
    render () {
      const C = this.state.component
      return C
        ? <C {...this.props} />
        : null
    }
  }
  return AsyncComponent
}
