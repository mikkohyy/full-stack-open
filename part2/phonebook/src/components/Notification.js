import React from 'react'

const Notification = ({ info }) => {
  const { message, wasSuccessfulOperation } = info
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: wasSuccessfulOperation ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return(
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification