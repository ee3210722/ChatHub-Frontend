import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import './Welcome.css';

const StartIntro = () => {

  const userLoggedIn = JSON.parse(sessionStorage.getItem('userInfo'));

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ ease: "anticipate", duration: "0.3" }} className="startIntro-container">

        <div className='introMessage-upper'>
          <p className='introName'>Hi, {userLoggedIn.name} 👋</p>
          <img src="https://res.cloudinary.com/harshitcloud/image/upload/v1710887840/lmfopoxkue5aj34x0mch.png" alt='' style={{ height: "5rem", width: "5rem" }} />
          <h4 >ChatHub For Desktop</h4>
          <p>Send and Receive Messages, without keeping your phone online</p>
        </div>

        <div className='introMessage-lower'>
          <div>
            <LockPersonOutlinedIcon></LockPersonOutlinedIcon>
          </div>
          <div>
            <p>End-to-end Encrypted</p>
          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  )
}

export default StartIntro
