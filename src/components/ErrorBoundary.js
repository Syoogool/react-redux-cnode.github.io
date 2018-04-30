import React from 'react'

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hasError: false
		}
	}

	componentDidCatch(error, info) {
		this.setSate({ hasError: true })
		logErrorToMyService(error, info)
	}

	render () {
		if (this.state.hasError) {
			return <h1>something went wrong</h1>
		}
		reurn this.props.children;
	}
}