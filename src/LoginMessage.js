import React from 'react'
import "./LoginMessage.css"

function LoginMessage({messageClass, messageContent}) {
  return (
    <div className={messageClass}>
      <h1 className="login-message-title">Logged Out</h1>
      <p>Login to see your {messageContent}</p>
    </div>


  )
}

export default LoginMessage
