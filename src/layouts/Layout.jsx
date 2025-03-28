import React from "react";
import "../styles/Layout.css";

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <header className="layout-header">
                <div className="logo-container">
                <img src="/logo.png" alt="Logo" className="logo"/>
                <h1 className="DMS"> DMS </h1>
                </div>
                <div className="header-icons">
                    <img src="/bell-icon.png" alt="Bell" className="bell"/>
                    <img src="/user-icon.png" alt="User" className="user-avatar"/>


                </div>
            </header>
            <main className="layout-content">
                {children} {/* Вставляем переданное содержимое */}
            </main>
        </div>
    );
};

export default Layout;

