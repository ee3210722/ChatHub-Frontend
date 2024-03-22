import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

  const [chatAreaInfo, setChatAreaInfo] = useState(() => {
    const storedChatAreaInfo = JSON.parse(sessionStorage.getItem("chatAreaInfo"));
    return storedChatAreaInfo || {"convoChat": null, "chatName": null};
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    sessionStorage.setItem("chatAreaInfo", JSON.stringify(chatAreaInfo));
  }, [chatAreaInfo]);

  return (
    <ChatContext.Provider value={{chatAreaInfo, setChatAreaInfo, notifications, setNotifications}}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;