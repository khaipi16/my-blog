import React, { createContext, useContext, useState } from 'react';


// Define structure of context data
const defaultUserState = {
    userData: null, // will hold user details
    token: null, // will hold JWT token
    login: () => {},
    logout: () => {}
};

const UserContext = createContext(defaultUserState);


export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({ userData: null, token: null });

    const login = ( userData, token ) => {
        localStorage.setItem('token', token)
        setUserData({ userData, token });
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUserData({ userData: null, token: null });
    }

    return (
        <UserContext.Provider value={{ ...userData, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

// Custom hook for using context easily in components
export const useUser = () => useContext(UserContext);