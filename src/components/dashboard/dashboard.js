import React from 'react';
import './dashboard.css';

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.87170709.1707350400&semt=ais" alt='' className="dashboard-img" />
      <h2 className="dashboard-username">User Name</h2>
      <h3 className="dashboard-role">Project Manager</h3>
      <p className="dashboard-bio">Write your Bio</p>
      <div className="dashboard-stats">
        <div className="dashboard-friends">
            <h2>96</h2>
            <h4>Friends</h4>
        </div>
        <div className="dashboard-groups">
            <h2>12</h2>
            <h4>Groups Joined</h4>
        </div>
        <div className="dashboard-rating">
            <h2>8.9</h2>
            <h4>Rating</h4>
        </div>
      </div>
    </div>
  );
}
