import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

  const [chatAreaInfo, setChatAreaInfo] = useState(() => {
    const storedChatAreaInfo = JSON.parse(sessionStorage.getItem("chatAreaInfo"));
    return storedChatAreaInfo || {"convoChat": null, "chatName": null};
  });


  useEffect(() => {
    sessionStorage.setItem("chatAreaInfo", JSON.stringify(chatAreaInfo));
  }, [chatAreaInfo]);

  return (
    <ChatContext.Provider value={{chatAreaInfo, setChatAreaInfo}}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;