import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Loadable from 'react-loadable'
import { fetchPostsIfNeeded } from '../../actions/article'
import HeaderNav from '../../components/HeaderNav'
import Loader from '../../components/Loader'
import CommentForm from '../../components/CommentForm'
// import CommentList from '../../components/CommentList'
import './github-markdown.css'
import './details.css'

const LoadableCommentForm = Loadable({
  loader: () => import('../../components/CommentList'),
  loading: () => <div>Loading...</div>,
});

const Content = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 100px 0;
  text-align: left;
`

class Details extends React.Component {
  componentDidMount () {
    const { dispatch, match } = this.props
    const id = match.url.slice(7)

    dispatch(fetchPostsIfNeeded(id))
  }

  render () {
    // 如何拿到深层数据
    // 这个问题貌似说明要使用的数据最好在state中初始化，特别是要迭代的对象
    const {author, content, isFetching, replies, title} = this.props.article

    return (
      <div className='details'>
        <HeaderNav title='详情页' icon='true' history={this.props.history} />
        <Content>
          { isFetching
            ? <Loader />
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
        </Content>
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
