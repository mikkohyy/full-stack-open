import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const { message, successful } = useSelector((state) => state.notification)

  if (message === null) {
    return null
  }

  return (
    <Alert
      className="notification-field"
      color={successful === true ? 'success' : 'error'}
    >
      {message}
    </Alert>
  )
}

export default Notification
