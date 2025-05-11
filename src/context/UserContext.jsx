import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [role, setRole] = useState(null); // По умолчанию null, чтобы не было неправильной роли

    const updateRole = (newRole) => {
        setRole(newRole);
        localStorage.setItem('role', newRole);
    };

    const clearRole = () => {
        setRole(null);
        localStorage.removeItem('role');
    };

    useEffect(() => {
        const savedRole = localStorage.getItem('role');
        if (savedRole) {
            setRole(savedRole);
        }
    }, []);

    return (
        <UserContext.Provider value={{ role, updateRole, clearRole }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => React.useContext(UserContext);
