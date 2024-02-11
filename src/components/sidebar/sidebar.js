import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
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
          <IconButton onClick={() => navigate("users")}><PersonAddIcon /></IconButton>
          <IconButton onClick={() => navigate("groups")}><GroupAddIcon /></IconButton>
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
