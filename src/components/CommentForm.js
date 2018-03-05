import React from 'react'
import axios from 'axios'
import classNames from 'classnames'
import { format, htmlSpecialChars } from '../utils/index'
import { receiveSucess } from '../actions/article'
import notice from './Notifice'

class CommentForm extends React.Component {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      isPosting: false,
      length: 0
    }
  }

  handleChange (e) {
    const length = e.target.value.trim().length
    this.setState({ length })
  }

  submit () {
    const replyId = this.props.id || this.props.article.id
    const { id: topicId, replies } = this.props.article

    const { token } = this.props.auth
    const { avatar_url, loginname } = this.props.auth.userInfo
    const { value: comment } = this.refs.comment
    // htmlSpecialChars 过滤评论中的特殊html字符
    const userName = `@${loginname}`
    const mdUserName = `<a href='/user/${loginname}'>@${loginname}</a>`
    // 如果时回复某一个评论  在内容前面加上 @username
    // this.props.replyId 判断是是回复评论还是帖子
    const content = this.props.replyId ? (userName + ' ' + htmlSpecialChars(comment))
      : htmlSpecialChars(comment)

    // 本地数据需要使用markdown渲染的 @username
    const localContent = this.props.replyId ? (mdUserName + ' ' + htmlSpecialChars(comment))
      : htmlSpecialChars(comment)
    const url = `https://cnodejs.org/api/v1/topic/${topicId}/replies`

    this.setState({
      isPosting: true
    })

    axios.post(url, {
      accesstoken: token,
      content: content,
      reply_id: replyId
    })
    .then(res => {
      this.setState({
        isPosting: false
      })

      // 重置表单
      this.refs.form.reset()
      this.setState({ length: 0 })

      if (this.props.replyId) {
        this.props.handleDisplay()
      }

      // 评论提示信息
      notice('评论成功')

      const data = {
        author: {
          avatar_url: avatar_url,
          loginname: loginname
        },
        content: localContent,
        create_at: format(new Date()),
        is_uped: false,
        reply_id: null,
        ups: []
      }

      if (res.data) {
        const comment = { ...data, id: res.data.reply_id }
        const postData = { ...this.props.article, replies: [...replies, comment] }

        this.props.dispatch(receiveSucess(topicId, postData))
      }
    })
    .catch(err => {
      this.setState({
        isPosting: false
      })
      if (err.response) {
        notice(err.response.data.error_msg)
      } else {
        console.log('Error', err.message)
      }
    })
  }

  render () {
    const btnSubmitClass = classNames(
      'ui', 'blue', 'labeled', 'submit', 'icon', 'button',
      { 'disabled': Boolean(!this.state.length) || this.state.isPosting }
    )

    return (
      <form ref='form' className='ui reply form'>
        <div className='field'>
          <textarea ref='comment' defaultValue=''
            onChange={this.handleChange}
            placeholder={this.props.id ? `@${this.props.loginname}` : ''}
          />
        </div>
        <div className={btnSubmitClass}
          onClick={this.submit}><i className='icon edit' />评论</div>
      </form>
    )
  }
}

export default CommentForm
