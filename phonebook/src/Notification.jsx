const Notification = ({ message }) => {
  return message ? <div className={message.type}>{message.text}</div> : null;
}

export default Notification;