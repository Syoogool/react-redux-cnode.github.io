import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Loadable from 'react-loadable'
import { Comment, Header } from 'semantic-ui-react'
import { fetchPostsIfNeeded } from '../../actions/article'
import HeaderNav from '../../components/HeaderNav'
import Loader from '../../components/Loader'
import CommentForm from '../../components/CommentForm'
import BaseContent from '../../components/BaseContent'
// import CommentList from '../../components/CommentList'
import './github-markdown.css'
import './details.css'

const LoadableCommentForm = Loadable({
  loader: () => import('../../components/CommentList'),
  loading: () => <div>Loading...</div>,
});

class Details extends React.Component {
  componentDidMount () {
    const { dispatch, match } = this.props
    const id = match.url.slice(7)

    dispatch(fetchPostsIfNeeded(id))
  }

  render () {
    // 如何拿到深层数据
    // 这个问题貌似说明要使用的数据最好在state中初始化，特别是要迭代的对象
    const {
      author, content, isFetching,replies, title,
      create_at, visit_count, reply_count
    } = this.props.article

    return (
      <div className='details'>
        <HeaderNav title='详情页' icon='true' history={this.props.history} />
        <BaseContent>
          { isFetching
            ? <Loader />
            : <div className='content-box'>
              <Comment.Group>
                <Comment>
                  <Comment.Avatar as='a' src={author.avatar_url} alt={author.loginname} />
                  <Comment.Content>
                    <Comment.Author>{author.loginname}</Comment.Author>
                    <Comment.Actions>
                      <Comment.Action>{create_at}</Comment.Action>
                      <Comment.Action>{visit_count}阅读</Comment.Action>
                      <Comment.Action>{reply_count}回复</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
              <Header as='h2' block textAlign='left' size='large'>{ title }</Header>
              <div className='markdown-body'>
                {/* dangerouslySetInnerHTML 是 React 用于代替在浏览器 DOM 中使用 innerHTML */}
                <div dangerouslySetInnerHTML={{__html: content}} />
              </div>
              <div className='ui horizontal divider'>评论 </div>
              <div className='ui comments'>
                <LoadableCommentForm
                  replies={replies}
                  article={this.props.article}
                  auth={this.props.auth}
                  dispatch={this.props.dispatch}
                />
              </div>

              {/* 评论输入框 */}
              <CommentForm
                article={this.props.article}
                auth={this.props.auth}
                dispatch={this.props.dispatch}
              />
            </div>
          }
        </BaseContent>
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
