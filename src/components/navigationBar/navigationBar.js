import React, { useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from '../SidebarData';
import { IconContext } from 'react-icons';
import { useNavigate } from 'react-router-dom';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './navigationBar.css';

function Navbar(props) {

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const navigate = useNavigate();

  const handleLogout = async (e) => {
      e.preventDefault();
      const response = await fetch("https://chathub-server-r5w7.onrender.com/logout", {
        method: 'GET',
        headers: {
          'authToken': localStorage.getItem('token')
        }
      });
      const json = await response.json()
    if (json.success) {
          localStorage.removeItem('token');
          props.showAlert(json.msg, "success");
          navigate("/");
      }
      else{
          props.showAlert(json.msg, "danger");
      }
  };


  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>

        <div className='navbar'>

          {localStorage.getItem('token') ? (
            <div className='menu-bars'>
            <Link to='#' className='menu-bars'><FaIcons.FaBars onClick={showSidebar}/></Link>
            </div>
          ) : (
              <div className='navbar-actions'>
              <Link to='/' className='home-link'>Home</Link>
              <Link to='/about' className='aboutus-link'>About Us</Link>
              </div>
          )}

          <div className='navbar-title'>
            ChatHub
          </div>

          {localStorage.getItem('token') ? (
            <div className='navbar-icons'>
              <div><AccountCircleIcon /></div>
              <div><CircleNotificationsIcon/></div>
              <button onClick={handleLogout} className="btn btn-primary">Logout</button>
          </div>
          ) : (
            <div className='navbar-actions'>
              <Link to='/login' className='login-link'>Login</Link>
              <Link to='/register' className='register-link'>Register</Link>
            </div>
          )}

        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'><AiIcons.AiOutlineClose/></Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  {item.title === 'Logout' ? (
                    <Link onClick={handleLogout}>
                      {item.icon}<span>{item.title}</span>
                    </Link>
                  ) : (
                    <Link to={item.path}>
                      {item.icon}<span>{item.title}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

      </IconContext.Provider>
    </>
  );
}

export default Navbar;
