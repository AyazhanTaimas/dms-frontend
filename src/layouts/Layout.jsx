import React, { useState } from "react";
import Notification from "../components/Notification"; // Оставляем один правильный импорт
import "../styles/Layout.css";

const Layout = ({ children }) => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // Массив уведомлений
    const notifications = [
        "Новое обновление системы",
        "Ваш заказ обработан",
        "Новое сообщение от администратора"
    ];

    return (
        <div className="layout-container">
            <header className="layout-header">
                <div className="logo-container">
                    <img src="/logo.png" alt="Logo" className="logo"/>
                    <img src="/dmsforlayout.png" alt="Dms" className="dms"/>
                </div>

                <div className="header-icons">
                    <img
                        src="/bell-icon.png"
                        alt="Bell"
                        className="bell"
                        onClick={() => setIsNotificationOpen(true)} // Открыть уведомления
                    />
                    <img src="/user-icon.png" alt="User" className="user-avatar"/>
                </div>
            </header>

            <main className="layout-content">
                {children}
            </main>

            {/* Окно с уведомлениями */}
            <Notification
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
                notifications={notifications} // Передаём массив уведомлений
            />
        </div>
    );
};

export default Layout;
