import React from 'react'
import Notification from 'rc-notification'
import 'rc-notification/assets/index.css'

let notification = null
Notification.newInstance({}, (n) => notification = n)

const notifice = info => {
  notification.notice({
    content: <span>{ info }</span>,
    duration: 2,
    style: {
      transform: 'translateX(-50%)',
      borderRadius: '5px',
      background: 'rgba(0, 0, 0, .8)',
      color: '#fff'
    }
  })
}

export default notifice
