import React, { useState } from "react";
import Notification from "../components/Notification";
import UserCard from "../components/UserCard";
import "../styles/Layout.css";

const Layout = ({ children }) => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isUserCardOpen, setIsUserCardOpen] = useState(false);

    return (
        <div className="layout-container">
            <header className="layout-header">
                <div className="logo-container">
                    <img src="/logo.png" alt="Logo" className="logo" />
                    <img src="/dmsforlayout.png" alt="Dms" className="dms" />
                </div>

                <div className="header-icons">
                    <img
                        src="/bell-icon.png"
                        alt="Bell"
                        className="bell"
                        onClick={() => {
                            setIsNotificationOpen((prev) => !prev);
                            if (isUserCardOpen) setIsUserCardOpen(false);
                        }}
                    />

                    <img
                        src="/user-icon.png"
                        alt="User"
                        className="user-avatar"
                        onClick={() => {
                            setIsUserCardOpen((prev) => !prev);
                            if (isNotificationOpen) setIsNotificationOpen(false);
                        }}
                    />
                </div>
            </header>

            <main className="layout-content">{children}</main>

            {isNotificationOpen && (
                <Notification isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
            )}
            {isUserCardOpen && (
                <UserCard isOpen={isUserCardOpen} onClose={() => setIsUserCardOpen(false)} />
            )}
        </div>
    );
};

export default Layout;

