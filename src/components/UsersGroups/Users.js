import React, {useState, useEffect} from 'react';
import { AnimatePresence, motion } from "framer-motion";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { IconButton } from '@mui/material';
import { BACKEND_URL } from '../../services/info';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../Context/ChatProvider';
import './UsersGroups.css';

export default function Users() {

    const navigate = useNavigate();
    const { setChatAreaInfo } = ChatState();
    const userLoggedIn = JSON.parse(sessionStorage.getItem('userInfo'));

    const [allUsers, setAllUsers] = useState([]);

    const getAllusers = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/user/fetchAllUsers`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            const json = await response.json();
            setAllUsers(json);
        } catch (error) {
            console.error('An error occurred during data fetching:', error);
        }
    }

    useEffect(() => {
        getAllusers();
    },[])


    const handleClickOnUser = async (userId) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/chat/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId })
            });
            const chat = await response.json();
            let chatName = "";
            chat.users.forEach((otherUser) => {
                if (otherUser._id !== userLoggedIn._id) chatName = otherUser.name;
            });
            setChatAreaInfo({ "convoChat": chat, "chatName": chatName });
            navigate(`/mainContainer/${chat._id}/${encodeURIComponent(chatName)}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <AnimatePresence>
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} transition={{ease: "anticipate",duration: "0.3"}} className="list-container">
            <div className="ug-header">
                <img src="https://img.freepik.com/premium-vector/live-chat-icon-with-speech-bubble-support-service_349999-1230.jpg" alt='' style={{ height: "4rem", width: "4rem" }} />
                <p className="ug-title">Online Users</p>
            </div>

            <div className="ug-search">
                <IconButton><SearchOutlinedIcon></SearchOutlinedIcon></IconButton>
                <input type="text" placeholder="Search" className="search-box" />
            </div>

            <div className="ug-list">

            {allUsers && allUsers.map((user, index) => (
                <motion.div key={index} onClick={() => handleClickOnUser(user._id)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.91 }} className="list-item">
                    <p className="list-item-icon">{user.name.charAt(0)}</p>
                    <p className="list-item-title">{user.name}</p>
                </motion.div>
            ))}

            </div>
        </motion.div>
    </AnimatePresence>
  )
}
