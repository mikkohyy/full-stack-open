import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return (
    <div style={style}>
      {props.text}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    text: state.notification.text
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification