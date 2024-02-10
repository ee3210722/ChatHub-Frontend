import React from 'react'
import ChatArea from "../chatarea/chatarea.js";
import Sidebar from "../sidebar/sidebar.js";
import "./chats.css";

export default function Chats() {
  const user = {
    name: "User1",
    lastMessage: "Last Message #1",
    timeStamp: "today"
  }

  return (
      <div className="main-container">
          <Sidebar/>
          <ChatArea props={user} />
      </div>
  )
}
