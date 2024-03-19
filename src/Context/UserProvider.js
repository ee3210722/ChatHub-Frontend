import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const initialUserString = sessionStorage.getItem("userInfo");
    let initialUser = null;

    try {
        if (initialUserString) {
            initialUser = JSON.parse(initialUserString);
        }
    } catch (error) {
        console.error("Error parsing user data:", error);
    }

    const [user, setUser] = useState(initialUser);


    // chatgpt se mtlb poochna h iska
    useEffect(() => {
        sessionStorage.setItem('userInfo', JSON.stringify(user));
    },[user])


    return (
        <UserContext.Provider value={{user, setUser}}>
        {children}
        </UserContext.Provider>
    );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;