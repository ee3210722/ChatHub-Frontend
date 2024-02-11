import React from 'react';
import { useNavigate } from 'react-router-dom';
import './convoitems.css';

export default function ConversationsItem({ props }) {

  const navigate = useNavigate();

  return (
      <div className="userConvo-container" onClick={()=> navigate('') }>
          <p className="userConvo-icon">{props.name[0]}</p>
          <p className="userConvo-title">{props.name}</p>
          <p className="userConvo-lastMessage">{props.lastMessage}</p>
          <p className="userConvo-timeStamp">{props.timeStamp}</p>
    </div>
  )
}
