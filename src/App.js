import React, { useState } from 'react';

import Alert from "./components/Alert";
import Navbar from './components/navigationBar/navigationBar';
import Home from './components/home/home';
import Login from './components/login/login';
import Signup from "./components/signup/signup";
import Dashboard from './components/dashboard/dashboard';
import Chats from './components/chats/chats';
import Rooms from './components/Rooms';
import About from './pages/About';

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
            <Route exact path='/dashboard' element={<Dashboard></Dashboard>}/>
            <Route exact path='/chats' element={<Chats />}  />
            <Route exact path='/rooms' element={<Rooms />}  />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;