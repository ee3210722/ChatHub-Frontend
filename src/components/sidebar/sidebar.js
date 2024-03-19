import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ConversationsItem from '../convoitems/convoitems';
import { BACKEND_URL } from '../../services/info';
import './sidebar.css';

export default function Sidebar() {

  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  const userLoggedIn = JSON.parse(sessionStorage.getItem('userInfo'));

  const fetchAllChats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/chat/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      const json = await response.json();
      setConversations(json);
    } catch (error) {
      throw new Error('Failed to fetch converstaions: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  // pending
  useEffect(() => {
    fetchAllChats();
  }, []); // add some dependencies in order to render joined group immediatly.


  return (
    <div className="sidebar-container">

      <div className="sb-header">
          <IconButton className="sb-header-item" onClick={() => navigate("")}><HomeIcon/></IconButton>
          <IconButton className="sb-header-item" onClick={() => navigate("users")}><PersonIcon /></IconButton>
          <IconButton className="sb-header-item" onClick={() => navigate("groups")}><GroupIcon /></IconButton>
          <IconButton className="sb-header-item" onClick={() => navigate("")}><DisplaySettingsIcon/></IconButton>
          <IconButton className="sb-header-item"><DarkModeIcon /></IconButton>
      </div>

      <div className="sb-search">
        <IconButton><SearchIcon/></IconButton>
        <input className="search-box" type="text" placeholder="Search"  />
      </div>

      <div className="sb-conversations">
        {loading ? (
          <div>Loading...</div>
        ) : (
            conversations.map((conversation, index) => {
              let chatName = "";
              if (conversation.isGroupChat) {
                chatName = conversation.chatName; }
              else {
                conversation.users.forEach((otherChatUser) => {
                  if (userLoggedIn._id !== otherChatUser._id) chatName = otherChatUser.name;
                });
              }
              return <ConversationsItem key={index} convoChat={conversation} chatName={chatName} />
        })
        )}
      </div>
  </div>
  )
}
