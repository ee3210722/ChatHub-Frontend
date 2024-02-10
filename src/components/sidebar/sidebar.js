import React, {useState} from 'react';
import { IconButton } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import ConversationsItem from '../convoitems/convoitems';
import './sidebar.css';

export default function Sidebar() {

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
          <IconButton><GroupAddIcon /></IconButton>
          <IconButton><DarkModeIcon /></IconButton>
        </div>
      </div>

      <div className="sb-search">
        <IconButton><SearchIcon/></IconButton>
        <input className="search-box" type="text" placeholder="search"  />
      </div>

      <div className="sb-conversations">
        {conversations.map((conversation,index) => {
          return <ConversationsItem key={index} props={conversation} />
        })}
      </div>

  </div>
  )
}
