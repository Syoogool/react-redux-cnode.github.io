import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Posts from '../../components/Posts'
import Navbar from '../../components/Navbar'
import InfiniteScroll from 'react-infinite-scroller'
import classNames from 'classnames'
import { selectTab, fetchPostsIfNeeded } from '../../actions'
import './home.css'

const Content = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 50px 20px;
  text-align: left;
`

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.loadMore = this.loadMore.bind(this)
  }

  componentDidMount () {
    const { dispatch, selectedTab, posts } = this.props
    // why this.props 很多字段是undefined
    // 重新挂载组件时，如果组件有之前的数据，便不发请求数据
    if (posts.length === 0) {
      dispatch(fetchPostsIfNeeded(selectedTab, 1))
    }
  }

  componentWillReceiveProps (nextProps) {
    // 根据selectedTab值是否改变来更新内容
    // 同上 如果不加条件每次成立都会请求开始第一页数据，造成数据重复
    // 判断是否已经有之前加载的数据，如果有就不请求数据，直接渲染已有数据
    if (nextProps.selectedTab !== this.props.selectedTab) {
      const { dispatch, selectedTab, posts } = nextProps
      if (posts.length === 0) {
        dispatch(fetchPostsIfNeeded(selectedTab, 1))
      }
      window.scrollTo(0, 0)
    }
  }

  loadMore () {
    // 这个可能有问题
    const { dispatch, pageCount, selectedTab, isFetching } = this.props

    if (!isFetching) {
      const nextPageCount = pageCount + 1
      dispatch(fetchPostsIfNeeded(selectedTab, nextPageCount))
    }
  }

  handleChange () {
    const nextTab = this.props.history.location.search.slice(5)
    // 更新this.props中selectedTab值
    this.props.dispatch(selectTab(nextTab))
  }

  render () {
    const { posts, isFetching, pageCount, selectedTab } = this.props
    const isEmpty = posts.length === 0

    return (
      <div className='home'>
        <ul className='header-nav' onClick={this.handleChange}>
          <li><Link to='/?tab=all' className={classNames({'selected': selectedTab === 'all'})}>全部</Link></li>
          <li><Link to='/?tab=good' className={classNames({'selected': selectedTab === 'good'})}>精华</Link></li>
          <li><Link to='/?tab=share' className={classNames({'selected': selectedTab === 'share'})}>分享</Link></li>
          <li><Link to='/?tab=ask' className={classNames({'selected': selectedTab === 'ask'})}>问答</Link></li>
          <li><Link to='/?tab=job' className={classNames({'selected': selectedTab === 'job'})}>招聘</Link></li>
          <li><Link to='/?tab=dev' className={classNames({'selected': selectedTab === 'dev'})}>测试</Link></li>
        </ul>
        <Content>
          { isEmpty ? (isFetching ? <h2>loading...</h2> : <h2>empty</h2>)
            : <InfiniteScroll
              pageStart={0}
              // loadMore={debounce(this.loadMore.bind(this), 1000)}
              loadMore={this.loadMore}
              hasMore
              loader={<div>load.......</div>}>
              <Posts posts={posts} isFetching={isFetching} key={pageCount + 1} />
            </InfiniteScroll>
          }
        </Content>
        <Navbar />
      </div>
    )
  }
}

Home.propTypes = {
  isFetchings: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  pageCount: PropTypes.number,
  selectedTab: PropTypes.string.isRequired
}

// 把state映射到props
const mapStateToProps = state => {
  const { selectedTab, postsByTab } = state
  const {
    isFetching,
    lastUpdated,
    pageCount,
    items: posts
  } = postsByTab[selectedTab] || {
    items: []
  }

  return {
    selectedTab,
    posts,
    pageCount,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(Home)
