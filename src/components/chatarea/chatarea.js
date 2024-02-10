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

export default function ChatArea({props}) {
  return (
      <div className="chatArea-container">

        <div className="chatArea-header">
            <p className="con-icon">{props.name[0]}</p>
            <div className="header-text">
                <p className="con-title">{props.name}</p>
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
