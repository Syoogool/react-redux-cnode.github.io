import React from 'react'
import CommentForm from './CommentForm'

class CommentList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      display: false,
      key: -1
    }
    this.handleDisplay = this.handleDisplay.bind(this)
  }

  componentDidMount () {
    console.log('test')
  }

  handleDisplay (e) {
    console.log(e)
    // see http://blog.csdn.net/domBREAKPoint/article/details/76732256
    this.setState({
      display: !this.state.display
    })

    if (e) {
      this.setState({
        key: Number(e.currentTarget.getAttribute('data-key'))
      })
    }
  }

  render () {
    // 登陆判断
    const { isAuthenticated } = this.props.auth

    return (
      this.props.replies.map((item, i) =>
        <div className='comment' key={i}>
          <a className='avatar'>
            <img
              src={item.author.avatar_url}
              alt={item.author.loginname}
              />
          </a>
          <div className='content'>
            <a className='author'>{ item.author.loginname }</a>
            <div className='metadata'>
              <span className='date'>{item.create_at}</span>
            </div>
            <div className='text' dangerouslySetInnerHTML={{__html: item.content}} />
            { isAuthenticated
              ? <div className='actions'>
                <a className='reply' onClick={this.handleDisplay} data-key={i}>回复</a>
                {(i === this.state.key && this.state.display)
                  ? <CommentForm
                    article={this.props.article}
                    auth={this.props.auth}
                    dispatch={this.props.dispatch}
                    replyId={item.id}
                    loginname={item.author.loginname}
                    handleDisplay={this.handleDisplay}
                   /> : ''}
              </div>
              : null
            }
          </div>
        </div>
      )
    )
  }
}

export default CommentList
