import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Form, TextArea, Select, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import notice from '../../components/Notifice'
import Navbar from '../../components/Navbar'
import HeaderNav from '../../components/HeaderNav'
import NoLogin from '../../components//NoLogin'

// 外边距合并问题
const Content = styled.div`
  padding-top: 50px;
`
const options = [
  { key: 'share', text: '分享', value: 'share' },
  { key: 'ask', text: '问答', value: 'ask' },
  { key: 'job', text: '招聘', value: 'job'},
  { key: 'dev', text: '测试', value: 'dev'}
]

class CreateForm extends React.Component {
  constructor(props) {
    super(props)
    this.resetForm = this.resetForm.bind(this)
    //表单数据初始化
    this.state = {
      title: '',
      tab: '',
      content: ''
    }
  }
  
  // 受控表单
  handleChange = (e, { name, value }) => this.setState({ [name]: value})

  // 重置表单
  resetForm () {
    this.setState({
      title: '',
      tab: '',
      content: ''
    })
  }
  
  // 表单提交处理事件
  handleSubmit = () => {
    const { tab, title, content } = this.state
    const url = 'https://cnodejs.org/api/v1/topics'
    this.setState({ title, tab, content })

    axios.post(url,{
      title,
      tab,
      content,
      accesstoken: this.props.token
    })
    .then(res => {
      // 重置表单
      this.resetForm()
      // 创建成功提示消息
      notice('创建成功')
    })
    .catch(error => {
      if (error.response) {
        notice(error.response.data.error_msg)
      } else {
        console.log('Error', error.message)
      }
    })
  }

  render () {
    const { title, tab, content } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field control={Select} name='tab' value={tab} onChange={this.handleChange} options={options} placeholder='请选择测试类型' />
        <Form.Group widths='equal'>
          <Form.Input fluid name='title' value={title} onChange={this.handleChange} placeholder='标题字数不少于10字' />
        </Form.Group>
        <Form.Field control={TextArea} name='content' value={content} onChange={this.handleChange} placeholder='内容字数不少于30字' />
        <Form.Field control={Button}>提交</Form.Field>
        <pre>{JSON.stringify({ tab, title, content }, null, 2)}</pre>
      </Form>
    )
  }
}

class Create extends React.Component {
  render () {
    const { auth } = this.props
    
    return (
      <React.Fragment>
        <HeaderNav title='新建主题' />
        <Content> 
          { auth.isAuthenticated ?
            <CreateForm token={auth.token} /> : <NoLogin />
          }
        </Content>
        <Navbar />
      </React.Fragment> 
    )
  }
}

const mapStateToProps = state => {
  const { auth } = state
  return {
    auth
  }
}

export default connect(mapStateToProps)(Create)
