import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <div className='homepage-container'>

      <div className='homepage-right'>
        <h1 className='homepage-title'>Enjoy ChatHub</h1>
        <p className='homepage-description'>"ChatHub, where connections come to life! Experience seamless communication and collaboration with ChatHub — your go-to platform for effortless messaging, group discussions, and real-time interaction. Elevate your conversations with friends, family, and colleagues in a secure and user-friendly environment. Connect, share, and stay in sync with ChatHub, where every message matters. Welcome to a world where communication meets simplicity, only at ChatHub."</p>
        <div className='homepage-signup'>
          <button className='btn btn-primary' onClick={handleClick}>Sign Up For Free</button>
        </div>
      </div>

      <div className='homepage-left'>
        <img className='homepage-image' src="https://chatkr.com/static/img/homepage_2.png" alt="" />
      </div>

    </div>
  );
}
