import React from 'react';
import './StartIntro.css';
import { AnimatePresence, motion } from 'framer-motion';

const StartIntro = () => {
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} transition={{ease: "anticipate",duration: "0.3"}} className="startIntro-container">
        hello
      </motion.div>
    </AnimatePresence>
  )
}

export default StartIntro
