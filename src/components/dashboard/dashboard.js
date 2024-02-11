import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../services/info';
import './dashboard.css';

export default function Dashboard() {

  const [userProfileData, setUserProfileData] = useState({
    name: "Add Your Name",
    occupation: "Add your Role",
    bio: "Add your bio",
    friends: 0,
    rooms_joined: 0
  });

  const getUserData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/getUserData`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('token')
        }
      });
      console.log(response.status)
      if (response.ok) {
        const json = await response.json();
        setUserProfileData(json.userData);
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred during data fetching:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className='dashboard'>
      <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.87170709.1707350400&semt=ais" alt='' className="dashboard-img" />
      <h2 className="dashboard-username">{userProfileData.name}</h2>
      <h3 className="dashboard-role">{userProfileData.occupation}</h3>
      <p className="dashboard-bio">{userProfileData.bio}</p>
      <div className="dashboard-stats">
        <div className="dashboard-friends">
            <h2>{userProfileData.friends.length}</h2>
            <h4>Friends</h4>
        </div>
        <div className="dashboard-groups">
            <h2>{userProfileData.rooms_joined.length}</h2>
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
