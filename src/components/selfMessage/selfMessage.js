import React from 'react';
import './selfMessage.css'

export default function SelfMessage({msg}) {
  return (
      <div className="self-message-container">
          <div className="self-messageBox">
              <p className="self-lastMessage">{ msg.content}</p>
              <p className="self-timeStamp">{new Date(msg.updatedAt).toLocaleString()}</p>
          </div>
    </div>
  )
}
