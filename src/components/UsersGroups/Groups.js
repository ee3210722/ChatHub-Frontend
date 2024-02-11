import React from 'react';
import './UsersGroups.css';
import { IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function Groups() {
  return (
    <div className="list-container">

        <div className="ug-header">
              <img src="https://img.freepik.com/premium-vector/live-chat-icon-with-speech-bubble-support-service_349999-1230.jpg" alt="" style={{ height: "2rem", width: "2rem" }} />
              <p className="ug-title">Available Users</p>
        </div>

        <div className="ug-search">
              <IconButton><SearchOutlinedIcon></SearchOutlinedIcon></IconButton>
              <input type="text" placeholder="Search" className="search-box" />
        </div>

        <div className="ug-list">

            <div className="list-item">
                <p className="list-item-icon">T</p>
                <p className="list-item-title">Test Group</p>
            </div>
            <div className="list-item">
                <p className="list-item-icon">T</p>
                <p className="list-item-title">Test Group</p>
            </div>
            <div className="list-item">
                <p className="list-item-icon">T</p>
                <p className="list-item-title">Test Group</p>
            </div>
            <div className="list-item">
                <p className="list-item-icon">T</p>
                <p className="list-item-title">Test Group</p>
            </div>
            <div className="list-item">
                <p className="list-item-icon">T</p>
                <p className="list-item-title">Test Group</p>
            </div>

        </div>

    </div>
  )
}
