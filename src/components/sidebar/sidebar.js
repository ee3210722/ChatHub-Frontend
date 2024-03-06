import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import ConversationsItem from '../convoitems/convoitems';
import './sidebar.css';

export default function Sidebar() {

  const navigate = useNavigate();

  // eslint-disable-next-line
  const [conversations, setConversations] = useState([
    {
      name: "User1",
      lastMessage: "Last Message #1",
      timeStamp: "today"
    }, {
      name: "User2",
      lastMessage: "Last Message #1",
      timeStamp: "today"
    }, {
      name: "User3",
      lastMessage: "Last Message #1",
      timeStamp: "today"
    }
  ]);



  return (
    <div className="sidebar-container">

      <div className="sb-header">
        <h3>Chats</h3>
        <div>
          <IconButton onClick={() => navigate("users")}><PersonIcon /></IconButton>
          <IconButton onClick={() => navigate("groups")}><GroupIcon /></IconButton>
          <IconButton><DarkModeIcon /></IconButton>
        </div>
      </div>

      <div className="sb-search">
        <IconButton><SearchIcon/></IconButton>
        <input className="search-box" type="text" placeholder="Search"  />
      </div>

      <div className="sb-conversations">
        {conversations.map((conversation,index) => {
          return <ConversationsItem key={index} props={conversation}  />
        })}
      </div>

  </div>
  )
}
