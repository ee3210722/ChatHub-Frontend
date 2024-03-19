import React, {useState, useEffect} from 'react'
import { IconButton } from '@mui/material';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import SelfMessage from '../selfMessage/selfMessage';
import OthersMessage from '../othersMessage/othersMessage';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { Spinner } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChatState } from '../../Context/ChatProvider';
import { BACKEND_URL } from '../../services/info';
import './chatarea.css';
import io from 'socket.io-client';
let socket, selectedChatCompare;

export default function ChatArea() {

  const { chatAreaInfo } = ChatState();
  const [allMessages, setAllMessages] = useState([]);
  const [newMessageContent, setNewMessageContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const userLoggedIn = JSON.parse(sessionStorage.getItem('userInfo'));


  useEffect(() => {
    socket = io(BACKEND_URL);
    socket.emit("setup", userLoggedIn);
    socket.on("connection", () => {setSocketConnected(!socketConnected)});
  }, [])

  const getAllMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/message/${chatAreaInfo.convoChat._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      const json = await response.json();
      setAllMessages(json);

      // Check if socket is connected before emitting event
      if (socket && chatAreaInfo.convoChat) {
        socket.emit("join chat", chatAreaInfo.convoChat._id);
      }

    } catch (error) {
      throw new Error('Failed to fetch all Messages: ', error.messages);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllMessages();
    selectedChatCompare = chatAreaInfo.convoChat;
  }, [chatAreaInfo]);

  const sendMessage = async () => {
    try {
      const msgDetails = JSON.stringify({
        content: newMessageContent,
        chatId: chatAreaInfo.convoChat._id
      })
      const response = await fetch(`${BACKEND_URL}/api/message/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body:msgDetails
      })
      if (response.ok) {
          const responseData = await response.json();
          const newMessage = responseData.sendedMessage;
          socket.emit("new message", newMessage);
          setAllMessages([newMessage,...allMessages]);
      } else {
          console.log("An error occurred during updating sending message");
      }
    } catch (error) {
      // throw new Error('Failed to send the message: ' + error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        //notifications
        console.log("yha pr dikkat h shayad")
      } else {
        setAllMessages([newMessageReceived, ...allMessages]);
        console.log(allMessages)
      }
    })
  });

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} transition={{ease: "anticipate",duration: "0.3"}} className="chatArea-container">

        <div className="chatArea-header">
            <p className="chatArea-icon">{chatAreaInfo.chatName? chatAreaInfo.chatName[0] : "U"}</p>
            <div className="header-text">
                <p className="chatArea-title">{chatAreaInfo.chatName? chatAreaInfo.chatName : "User"}</p>
                <p className="online-status">Online</p>
            </div>
            <div className="icon-buttons">
              <IconButton><PhoneInTalkIcon/></IconButton>
              <IconButton><VideoCallIcon/></IconButton>
              <IconButton><MoreVertIcon/></IconButton>
          </div>
        </div>

      <div className="messages-container">
        {loading ?
          <div className="spinner-container">
            <Spinner thickness='4px' speed='10000s' emptyColor='#E2E8F0' color='#4299E1'  size='xl' h={30} w={30}/>
          </div>
         : (
          allMessages.slice(0).reverse()
            .map((message, index) => {
              if (userLoggedIn._id === message.sender._id) {
                return <SelfMessage msg={message} key={index}/>
              } else {
                return <OthersMessage msg={message} key={index}/>
              }
          })
        )}
      </div>

      <div className="text-input-area">
          <IconButton><InsertEmoticonOutlinedIcon/></IconButton>
          <IconButton><AttachFileOutlinedIcon/></IconButton>
          <input className="search-box" type="text" placeholder="Type a message" value={newMessageContent} onChange={(e) => setNewMessageContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                sendMessage();
                setNewMessageContent("");
              }
            }}
          />
          <IconButton onClick={() => sendMessage()}><SendIcon/></IconButton>
      </div>

      </motion.div>
    </AnimatePresence>
  )
}
