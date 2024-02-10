import React from 'react';
import './othersMessage.css'

export default function OthersMessage() {
    let props1 = {name: "RandomUser", message: "Hey, Harshit What's up?"}
  return (
    <div className="other-message-container">
        <div className="conversation-container">
            <p className="con-icon">{props1.name[0]}</p>
            <div className="other-text-content">
                <p className="con.title"><b>{props1.name}</b></p>
                <p className="con.lastMessage">{props1.message}</p>
                <p className="self-timeStamp">12:00 pm</p>
            </div>
        </div>
    </div>
  )
}
