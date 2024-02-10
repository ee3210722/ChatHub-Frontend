import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiOutlineDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Chats',
    path: '/chats',
    icon: <FaIcons.FaComments />,
    cName: 'nav-text'
  },
  {
    title: 'Rooms',
    path: '/rooms',
    icon: <IoIcons.IoMdChatbubbles  />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <FaIcons.FaSignOutAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];