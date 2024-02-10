import React from 'react';
import './selfMessage.css'

export default function SelfMessage() {
    let props2 = {name: "You", message: "I am good! How do you doing?"}
  return (
      <div className="self-message-container">
          <div className="messageBox">
              <p className="con.lastMessage">{ props2.message}</p>
              <p className="self-timeStamp">12:00 pm</p>
          </div>
    </div>
  )
}
