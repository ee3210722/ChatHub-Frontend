import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function GroupHeaderMenu({ anchorEl, open, onClose, isGroup }) {
  return (
    <>
      {!isGroup ? (
        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={onClose}>
          <MenuItem onClick={onClose}>View Contact</MenuItem>
          <MenuItem onClick={onClose}>Clear Chat</MenuItem>
          <MenuItem onClick={onClose}>Block</MenuItem>
        </Menu>
      ) : (
        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={onClose}>
          <MenuItem onClick={onClose}>Group Info</MenuItem>
          <MenuItem onClick={onClose}>Exit Group</MenuItem>
          <MenuItem onClick={onClose}>Clear Chat</MenuItem>
          <MenuItem onClick={onClose}>Delete Group</MenuItem>
        </Menu>
      )}
    </>
  );
}
