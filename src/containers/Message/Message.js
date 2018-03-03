import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { Comment, Header } from 'semantic-ui-react'
import Navbar from '../../components/Navbar'
import HeaderNav from '../../components/HeaderNav'
import { fetchMessage, receiveSucces } from '../../actions/message'
import Loader from '../../components/Loader'

const Content = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 100px 10px;
  text-align: left;
`
const RedDot = styled.div`
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: red;
`

const CommentItem = props => {
  // 向父组件传参
  function handleMark () {
    props.mark(props.item.id)
  }

  return (
    <Comment>
      <Comment.Avatar as='a' src={props.item.author.avatar_url} />
      <Comment.Content>
        <Comment.Author as='a'>{props.item.author.loginname}</Comment.Author>
        <Comment.Metadata>
          <span>{props.item.create_at}</span>
        </Comment.Metadata>
        {props.item.type === 'reply'
          ? <Comment.Text>
            {props.item.has_read ? '' : <RedDot /> }
              &nbsp;回复你了的话题
              <Link
                to={`/topic/${props.item.topic.id}`}
                onClick={handleMark}
                >
                &nbsp;{props.item.topic.title}
              </Link>
          </Comment.Text>
          : <Comment.Text>
            {props.item.has_read ? '' : <RedDot /> }
            &nbsp;在话题
            <Link
              to={`/topic/${props.item.topic.id}`}
              onClick={handleMark}
              >
              &nbsp;{props.item.topic.title}&nbsp;
            </Link>中@了你
          </Comment.Text>
        }
      </Comment.Content>
    </Comment>
  )
}

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.markOne = this.markOne.bind(this)
  }

  componentDidMount () {
    const { dispatch, auth } = this.props
    // 一个问题  强制刷新可能出现auth得不到登陆信息
    console.log(auth)
    dispatch(fetchMessage(auth.token))
  }

  // 接收子组件的传值
  markOne (val) {
    const { dispatch, auth } = this.props
    const { hasnot_read_messages, has_read_messages } = this.props.message
    let arr = hasnot_read_messages
    console.log(arr)
    // 使用map遍历修改嵌套对象属性
    // arr.map((item, i) => {
    //   if (item.id === val) {
    //     item['has_read'] = true
    //   }
    // })

    const newMessage = {
      has_read_messages,
      hasnot_read_messages: arr,
      success: true
    }
    const url = `https://cnodejs.org/api/v1/message/mark_one/${val}`

    axios.post(url, {
      accesstoken: auth.token
    })
    .then(res => {
      console.log(res)
      dispatch(receiveSucces(newMessage))
    })
  }

  render () {
    const { hasnot_read_messages, has_read_messages, isFetching } = this.props.message
    return (
      <div className='home'>
        <HeaderNav title='信息' />
        <Content>
          {
            isFetching
              ? <Loader />
              : <Comment.Group size='large'>
                <Header as='h3' dividing>未读消息</Header>
                {hasnot_read_messages.map((item, i) =>
                  <CommentItem key={i} item={item} mark={this.markOne} />
                )}
                <Header as='h3' dividing>已读消息</Header>
                {has_read_messages.map((item, i) =>
                  <CommentItem key={i} item={item} mark={this.markOne} />
                )}
              </Comment.Group>
          }
        </Content>
        <Navbar />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { auth, message } = state

  return {
    auth,
    message
  }
}

export default connect(mapStateToProps)(Home)
