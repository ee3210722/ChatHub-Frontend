import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../services/info';
import { UserState } from '../../Context/UserProvider';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import './dashboard.css';

export default function Dashboard() {

  const { user } = UserState();

  const [userProfileData, setUserProfileData] = useState({
    name: "Add Your Name",
    occupation: "Add your Role",
    bio: "Add your bio",
    friends: 0,
    groupsJoined: 0
  });

  const getUserData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/user/getUserData`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
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

  // The dependency array [user] specifies that the effect should be re-run whenever the user state changes.
  useEffect(() => {
    getUserData();
  }, [user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${BACKEND_URL}/api/user/uploadUserImage`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: formData
      });
      if (response.ok) {
        const json = await response.json();
        setUserProfileData(json.updatedUser);
      } else {
        console.error('Failed to upload image:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred during image upload:', error);
    }
  }

  return (
    <div className='dashboard'>
      <label htmlFor="image-upload">
        <img src={userProfileData.image} alt='' className="dashboard-img" />
        <span className="upload-icon"><AddAPhotoIcon/></span>
      </label>
      <input id="image-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
      <h2 className="dashboard-username">{userProfileData.name}</h2>
      <h3 className="dashboard-role">{!userProfileData.occupation ? "Add your Role" : userProfileData.occupation}</h3>
      <p className="dashboard-bio">{!userProfileData.bio ? "Add Your Bio" : userProfileData.bio}</p>
      <div className="dashboard-stats">
        <div className="dashboard-friends">
            <h2>{userProfileData.friends.length}</h2>
            <h4>Friends</h4>
        </div>
        <div className="dashboard-groups">
            <h2>{userProfileData.groupsJoined.length}</h2>
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
