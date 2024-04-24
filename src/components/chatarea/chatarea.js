import React, {useState, useEffect, useRef} from 'react'
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
import GroupHeaderMenu from '../UsersGroups/GroupHeaderMenu';
import './chatarea.css';
import io from 'socket.io-client';
let socket, selectedChatCompare;


export default function ChatArea(props) {

  const fileInputRef = useRef(null);

  const handleImageSelect = () => {
    fileInputRef.current.click();
  };

  const { chatAreaInfo } = ChatState();
  const [allMessages, setAllMessages] = useState([]);
  const [newMessageContent, setNewMessageContent] = useState("");
  const [imageContent, setImageContent] = useState(null);
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
          setAllMessages([newMessage, ...allMessages]);
      } else {
          console.log("An error occurred during updating sending message");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleFileSelect = (e) => {
    const selectedImage = e.target.files[0];
    setImageContent(selectedImage);
  };
  
  const sendImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', imageContent);
      const response = await fetch("http://127.0.0.1:8084/ml/make_bounding_box", {
          method: 'PUT',
          body: formData,
      });
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.status===200) {
          const isValid = responseData.result.face_present;
          console.log("isImageValid", isValid);
          if(!isValid){
            props.showAlert("Please upload a valid image!", 'danger');
            return;
          }
          const imgUrl = responseData.result.data;

          try {
            const msgDetails = JSON.stringify({
              content: imgUrl,
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
                console.log("responseData: " , responseData);
                const newMessage = responseData.sendedMessage;
                socket.emit("new message", newMessage);
                setAllMessages([newMessage, ...allMessages]);
            } else {
                console.log("An error occurred during updating sending message");
            }
          } catch (error) {
            console.log(error);
          }
      } else {
          console.log("An error occurred during face recoginition");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // let elem = document.getElementById("message-container");
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        // if (!notifications.includes(newMessageReceived)) {
        //   setNotifications([newMessageReceived, ...notifications]);
        //   console.log(notifications);
        // }
      } else {
        setAllMessages([newMessageReceived, ...allMessages]);
        // elem.scrollTop = elem.scrollHeight;
      }
    })
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };


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
              <IconButton aria-controls={isMenuOpen ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={isMenuOpen ? 'true' : undefined} onClick={handleMenuToggle}>
                <MoreVertIcon />
              </IconButton>
              {isMenuOpen && (
              <GroupHeaderMenu anchorEl={anchorEl} open={isMenuOpen} onClose={handleCloseMenu} isGroup={chatAreaInfo.convoChat.isGroupChat} />
              )}
          </div>
        </div>

      <div id="message-container" className="messages-container">
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
          <IconButton onClick={() => handleImageSelect() } style={{ display: imageContent ? "none" : "block" }}> <AttachFileOutlinedIcon/></IconButton>
          <input ref={fileInputRef} id="imageInput" type="file" accept="image/*" style={{ display: newMessageContent !== "" || imageContent === null ? "none" : "block" }}onChange={handleFileSelect}/>
          <input className="search-box" type="text" placeholder="Type a message" value={newMessageContent} style={{ display: imageContent ? "none" : "block" }} onChange={(e) => setNewMessageContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                sendMessage();
                setNewMessageContent("");
              }
            }}
          />
          {imageContent ?
            <IconButton onClick={() => sendImage()}><SendIcon/></IconButton>
            :
            <IconButton onClick={() => sendMessage()}><SendIcon/></IconButton>
          }
          
      </div>

      </motion.div>
    </AnimatePresence>
  )
}
