import React from 'react'
import Sidebar from "../sidebar/sidebar.js";
import { Outlet } from 'react-router-dom';
import "./mainContainer.css";

export default function MainContainer() {

  return (
    <div className="main-container">
      <Sidebar />
      <Outlet />
    </div>
  )
}
