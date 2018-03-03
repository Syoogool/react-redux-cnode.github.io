import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import styled from 'styled-components'
import TimeAgo from 'timeago-react'

const Post = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`
const PostList = styled.li`
  text-align: left;
  text-decoration: none;
  border-bottom: 1px solid #ddd;
`

const AuthorImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 5px;
`
const Posts = ({ posts, isFetching }) => (
  <React.Fragment>
    <Post>
      {posts.map((post, i) =>
        <PostList key={i}>
          <Link to={`/topic/${post.id}`} key={i}>
            { post.title }
          </Link>
          <div>
            <AuthorImg src={post.author.avatar_url} alt={post.author.loginname} />
            <span>{ post.author.loginname }&nbsp;&nbsp;</span>
            <span>{ post.reply_count}回复 &nbsp;&nbsp;</span>
            <TimeAgo datetime={post.create_at} locale='zh-CN' />
          </div>
        </PostList>
      )}

      { isFetching ? <p>正在努力加载中...</p> : ''}
    </Post>
    <Navbar />
  </React.Fragment>
)

export default Posts
