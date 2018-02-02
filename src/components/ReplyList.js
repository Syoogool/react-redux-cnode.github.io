import React from 'react'

const ReplyList = ({ replies }) => (
  replies.map((item, i) =>
    <div className='comment'>
      <a className='avatar'>
        <img src={item.author.avatar_url} alt={item.author.loginname} />
      </a>
      <div className='content'>
        <a className='author'>{ item.author.loginname }</a>
        <div className='metadata'>
          <span className='date'>今天下午 5:42</span>
        </div>
        <div className='text'>{ item.content }</div>
        <div className='actions'>
          <a className='reply'>Reply</a>
        </div>
      </div>
    </div>
  )
)

export default ReplyList
