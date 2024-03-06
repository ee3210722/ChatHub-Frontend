import React from 'react';
import './userItemList.css';

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div className="searchItem-container" onClick={handleFunction}>
      <div className="searchItem-left">
        <img className="searchItem-userImage" src={user.image} alt="User" />
      </div>
      <div className="searchItem-right">
        <p className="searchItem-userName">{user.name}</p>
        <p className="searchItem-userEmail">{user.email}</p>
      </div>
    </div>
  );
};

export default UserListItem;
