import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import './posts.css'
import TimeAgo from 'timeago-react'

const Posts = ({ posts, isFetching }) => (
  <React.Fragment>
    <ul className='posts'>
      {posts.map((post, i) =>
        <li key={i} className='posts-item'>
          <Link to={`/topic/${post.id}`} key={i}>
            { post.title }l
          </Link>
          <div>
            <img className='author-img' src={post.author.avatar_url} alt={post.author.loginname} />
            <span>{ post.author.loginname }&nbsp;&nbsp;</span>
            <span>{ post.reply_count}回复 &nbsp;&nbsp;</span>
            <TimeAgo datetime={post.create_at} locale='zh-CN' />
          </div>
        </li>
      )}

      { isFetching ? <p>正在努力加载中...</p> : ''}
    </ul>
    <Navbar />
  </React.Fragment>
)

export default Posts
