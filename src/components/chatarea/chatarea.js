import React from 'react'
import { IconButton } from '@mui/material';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import SelfMessage from '../selfMessage/selfMessage';
import OthersMessage from '../othersMessage/othersMessage';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import './chatarea.css';

export default function ChatArea() {

  const user = {
    name: "User1",
    lastMessage: "Last Message #1",
    timeStamp: "today"
  }

  return (
      <div className="chatArea-container">

        <div className="chatArea-header">
            <p className="chatArea-icon">{user.name[0]}</p>
            <div className="header-text">
                <p className="chatArea-title">{user.name}</p>
                <p className="online-status">Online</p>
            </div>
            <div className="icon-buttons">
              <IconButton><PhoneInTalkIcon/></IconButton>
              <IconButton><VideoCallIcon/></IconButton>
              <IconButton><MoreVertIcon/></IconButton>
          </div>
        </div>

        <div className="messages-container">
              <OthersMessage/>
              <SelfMessage />
              <OthersMessage/>
              <SelfMessage />
              <OthersMessage/>
              <SelfMessage />
              <OthersMessage/>
              <SelfMessage />
              <OthersMessage/>
              <SelfMessage />
              <OthersMessage/>
              <SelfMessage />
              <OthersMessage/>
              <SelfMessage />
              <OthersMessage/>
              <SelfMessage />
        </div>

      <div className="text-input-area">
          <IconButton><InsertEmoticonOutlinedIcon/></IconButton>
          <IconButton><AttachFileOutlinedIcon/></IconButton>
          <input className="search-box" type="text" placeholder="Type a message" />
          <IconButton><SendIcon/></IconButton>
      </div>

    </div>
  )
}
