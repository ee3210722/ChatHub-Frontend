import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../Context/ChatProvider';
import './convoitems.css';

export default function ConversationsItem({ convoChat, chatName }) {

  const navigate = useNavigate();

  const { setChatAreaInfo } = ChatState();

  const handleOnClick = () => {
    setChatAreaInfo({ "convoChat": convoChat, "chatName": chatName });
    navigate(`/mainContainer/${convoChat._id}/${encodeURIComponent(chatName)}`);
  }

  const limitMsgLength = (message) => {
    if (message.length > 50) {
      return message.slice(0, 50) + '...';
    }
    return message;
  }

  return (
    <div className="userConvo-container" onClick={() => handleOnClick()}>
      <p className="userConvo-icon">{chatName[0]}</p>
      <p className="userConvo-title">{chatName}</p>
      <p className="userConvo-lastMessage">{convoChat.latestMessage === undefined ? "Click here to start chatting" : limitMsgLength(convoChat.latestMessage.content)}</p>
      {convoChat.latestMessage !== undefined && <p className="userConvo-timeStamp">{new Date(convoChat.latestMessage.updatedAt).toLocaleString()}</p>}
    </div>
  )
}
