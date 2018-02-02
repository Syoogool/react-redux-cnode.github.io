import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { format } from '../../utils/index'
import { fetchPostsIfNeeded, receiveSucess } from '../../actions/article'
import './github-markdown.css'
import './details.css'

// import ReplyList from '../../components/ReplyList'

class Details extends React.Component {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
  }
  componentDidMount () {
    const { dispatch, match } = this.props
    const id = match.url.slice(7)

    dispatch(fetchPostsIfNeeded(id))
  }

  goBack () {
    this.props.history.goBack()
  }

  submit () {
    const { id: topicId, replies } = this.props.article
    const { token } = this.props.auth
    const { avatar_url, loginname } = this.props.auth.userInfo
    const { value: content } = this.refs.comment
    const url = `https://cnodejs.org/api/v1/topic/${topicId}/replies`

    axios.post(url, {
      accesstoken: token,
      content: content
    })
    .then(res => {
      const data = {
        author: {
          avatar_url: avatar_url,
          loginname: loginname
        },
        content: content,
        create_at: format(new Date()),
        is_uped: false,
        reply_id: null,
        ups: []
      }

      if (res.data) {
        const comment = { ...data, id: res.data.reply_id }
        const postData = { ...this.props.article, replies: [...replies, comment] }

        console.log(postData)
        this.props.dispatch(receiveSucess(topicId, postData))
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  render () {
    // 如何拿到深层数据
    // 这个问题貌似说明要使用的数据最好在state中初始化，特别是要迭代的对象
    const {author, content, isFetching, replies, title} = this.props.article

    return (
      <div className='details'>
        <div className='segment ui header-nav '>

          <i className=' red inverted angle left icon big' onClick={this.goBack.bind(this)} />
          详情页
        </div>
        { isFetching
          ? <h2>loading...</h2>
          : <div className='content-box'>
            <h2 className='ui header'>
              <img className='ui image' src={author.avatar_url} alt={author.loginname} />
              <div className='content'>{ title }</div>
            </h2>
            <div className='markdown-body'>
              {/* dangerouslySetInnerHTML 是 React 用于代替在浏览器 DOM 中使用 innerHTML */}

              <div dangerouslySetInnerHTML={{__html: content}} />
            </div>
            <div className='ui horizontal divider'>评论 </div>
            <div className='ui comments'>
              {
                  replies.map((item, i) =>
                    <div className='comment'>
                      <a className='avatar'>
                        <img src={item.author.avatar_url} alt={item.author.loginname} />
                      </a>
                      <div className='content'>
                        <a className='author'>{ item.author.loginname }</a>
                        <div className='metadata'>
                          <span className='date'>{item.create_at}</span>
                        </div>
                        <div className='text' dangerouslySetInnerHTML={{__html: item.content}} />
                        <div className='actions'>
                          <a className='reply'>Reply</a>
                        </div>
                      </div>
                    </div>
                  )
                }
            </div>
            {/* 评论输入框 */}
            <form className='ui reply form'>
              <div className='field'>
                <textarea ref='comment' defaultValue='' />
              </div>
              <div className='ui blue labeled submit icon button'
                onClick={this.submit}><i className='icon edit' /> Add Reply </div>
            </form>
          </div>
        }

      </div>
    )
  }
}

const mapStateToProps = state => {
  const { article, auth } = state
  return {
    article,
    auth
  }
}

export default connect(mapStateToProps)(Details)
