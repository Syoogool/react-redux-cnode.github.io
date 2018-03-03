import React from 'react'
import Notification from 'rc-notification'
import 'rc-notification/assets/index.css'

let notification = null
Notification.newInstance({}, (n) => notification = n)

const Notifice = props => {
  notification.notice({
    content: <span>{ props.content }</span>,
    duration: 2,
    style: {
      border: '1px solid green'
    }
  })
}

export default Notifice
