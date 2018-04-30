import React from 'react'
import { connect } from 'react-redux'
import Loadable from 'react-loadable'
import styled from 'styled-components'
import Loader from '../../components/Loader'
import Navbar from '../../components/Navbar'
import HeaderNav from '../../components/HeaderNav'
import NoLogin from '../../components//NoLogin'
import BaseContent from '../../components/BaseContent'

const ContentBox = styled.div`
  position: relative;
  margin-bottom: 100px;
`
const LoadableCreateForm = Loadable({
  loader: () => import('../../components/CreateForm'),
  loading: Loader,
  delay: 20
})

class Create extends React.Component {
  render () {
    const { auth } = this.props

    return (
      <ContentBox>
        <HeaderNav title='新建主题' />
        <BaseContent>
          { auth.isAuthenticated
            ? <LoadableCreateForm token={auth.token} /> : <NoLogin />
          }
        </BaseContent>
        <Navbar />
      </ContentBox>
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
