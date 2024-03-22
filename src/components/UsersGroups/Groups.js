import React, {useState, useEffect} from 'react';
import { IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { AnimatePresence, motion } from "framer-motion"
import Modalpopup from './ModalPopUp';
import { BACKEND_URL } from '../../services/info';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../Context/ChatProvider';
import './UsersGroups.css';

export default function Groups() {

    const { setChatAreaInfo } = ChatState();
    const navigate = useNavigate();

    const [open, openchange] = useState(false);
    const [allGroups, setAllGroups] = useState([]);

    const functionopenpopup=()=>{openchange(true)}
    const closepopup=()=>{openchange(false)}

    const getAllGroups = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/chat/fetchAllGroups`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            const json = await response.json();
            setAllGroups(json);
        } catch (error) {
            console.error('An error occurred during data fetching:', error);
        }
    }

    useEffect(() => {
        getAllGroups();
    }, [])

    const handleClickOnGroup = async (chatId) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/chat/accessGroupChat`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ chatId: chatId })
            });

            const responseData = await response.json();
            if (response.ok) {
                setChatAreaInfo({ "convoChat": responseData, "chatName": responseData.chatName });
                navigate(`/mainContainer/${responseData._id}/${encodeURIComponent(responseData.chatName)}`);
            } else if (response.status === 300) {
                console.log(responseData.msg);
                // modal or something else will be added
            } else {
                console.log(responseData.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} transition={{ease: "anticipate",duration: "0.3"}} className="list-container">
                <div className="ug-header">
                    <img src="https://img.freepik.com/premium-vector/live-chat-icon-with-speech-bubble-support-service_349999-1230.jpg" alt="" style={{ height: "4rem", width: "4rem" }} />
                    <p className="ug-title">Available Groups</p>
                    <div className='add-icon' onClick={functionopenpopup}><IconButton><GroupAddIcon/></IconButton></div>
                </div>

                <Modalpopup isOpen={open} onClose={closepopup}/>

                <div className="ug-search">
                    <IconButton><SearchOutlinedIcon></SearchOutlinedIcon></IconButton>
                    <input type="text" placeholder="Search" className="search-box" />
                </div>

                <div className="ug-list">
                    {console.log(allGroups)}
                    {allGroups.length > 0 && allGroups.map((group, index) => (
                        <motion.div key={index} onClick={() => handleClickOnGroup(group._id)} whileHover={{ scale: 1.03 }} whileTap={{scale: 0.91}} className="list-item">
                            <p className="list-item-icon">{group.chatName.charAt(0) }</p>
                            <p className="list-item-title">{group.chatName}</p>
                        </motion.div>
                    ))}
                </div>

            </motion.div>
        </AnimatePresence>
    )
}
