import React from 'react';
import { IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import './UsersGroups.css';

export default function Users() {
  return (
    <div className="list-container">

        <div className="ug-header">
              <img src="https://img.freepik.com/premium-vector/live-chat-icon-with-speech-bubble-support-service_349999-1230.jpg" alt='' style={{ height: "4rem", width: "4rem" }} />
              <p className="ug-title">Online Users</p>
        </div>

        <div className="ug-search">
              <IconButton><SearchOutlinedIcon></SearchOutlinedIcon></IconButton>
              <input type="text" placeholder="Search" className="search-box" />
        </div>

        <div className="ug-list">

            <div className="list-item">
                <p className="list-item-icon">T</p>
                <p className="list-item-title">Test User</p>
            </div>
            <div className="list-item">
                <p className="list-item-icon">T</p>
                <p className="list-item-title">Test User</p>
            </div>
            <div className="list-item">
                <p className="list-item-icon">T</p>
                <p className="list-item-title">Test User</p>
            </div>
            <div className="list-item">
                <p className="list-item-icon">T</p>
                <p className="list-item-title">Test User</p>
            </div>
            <div className="list-item">
                <p className="list-item-icon">T</p>
                <p className="list-item-title">Test User</p>
            </div>

        </div>

    </div>
  )
}
