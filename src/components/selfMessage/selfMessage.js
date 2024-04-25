import React from 'react';
import './selfMessage.css';

export default function SelfMessage({ msg }) {
  
  const convertToLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
  };

  return (
    <div className="self-message-container">
      <div className="self-messageBox">
        <p className="self-lastMessage" dangerouslySetInnerHTML={{ __html: convertToLinks(msg.content) }}></p>
        <p className="self-timeStamp">{new Date(msg.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
