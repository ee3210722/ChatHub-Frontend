import React, { useState } from 'react';

import Alert from "./components/Alert";
import Navbar from './components/navigationBar/navigationBar';
import Home from './components/home/home';
import About from './pages/About';
import Login from './components/login/login';
import Signup from "./components/signup/signup";
import Dashboard from './components/dashboard/dashboard';
import MainContainer from './components/mainContainer/mainContainer';
import Welcome from './components/welcome/Welcome';
import ChatArea from './components/chatarea/chatarea';
import Users from './components/UsersGroups/Users';
import Groups from './components/UsersGroups/Groups';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
  }

  return (
    <>
      <Router>
        <Navbar showAlert={showAlert}/>
        {alert ? <Alert alert={alert} /> : <div></div>}
        <div className="App">
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route exact path='/about' element={<About/>} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
            <Route exact path="/register" element={<Signup showAlert={showAlert}/>}></Route>
            <Route exact path='/dashboard' element={<Dashboard></Dashboard>} />

            <Route exact path='/mainContainer' element={<MainContainer />}>
              <Route index element={<Welcome/>} />
              <Route exact path=":conversation_id/:chatName" element={<ChatArea/>}/>
              <Route exact path='users' element={<Users/>} />
              <Route exact path='groups' element={<Groups/>} />
            </Route>
            
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;