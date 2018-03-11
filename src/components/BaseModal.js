import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

class BaseModal extends React.Component {
  state = {
    open: false
  }

  show = () => this.setState({
    open: true
  })

  close = () => this.setState({
    open: false
  })

  render () {
    const { open } = this.state
    return (
      <div>
        <Modal open={open} onClose={this.close}>
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negation>No</Button>
            <Button positive icon='checkmark' labelPosition='right' content='Yes' />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}