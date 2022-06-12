import React, { useImperativeHandle, useState } from 'react'
import { Button } from '@mui/material'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const { buttonLabel, children } = props

  const hiddenWhenVisible = { display: visible ? 'none' : '' }
  const shownWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hiddenWhenVisible}>
        <Button onClick={toggleVisibility} variant="outlined" size="small">
          {buttonLabel}
        </Button>
      </div>
      <div style={shownWhenVisible}>
        {children}
        <Button variant="outlined" onClick={toggleVisibility} size="small">
          cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
