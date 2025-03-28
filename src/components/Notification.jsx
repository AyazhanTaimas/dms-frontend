import React from "react";
import "../styles/Notification.css";

const Notification = ({ isOpen, onClose, notifications }) => {
    return (
        <div className={`notification-sidebar ${isOpen ? "open" : ""}`}>
            <button className="close-btn" onClick={onClose}>×</button>
            <h2>Уведомления</h2>

            <div className="notif-list">
                {notifications && notifications.length === 0 ? (
                    <p className="empty-message">Нет новых уведомлений</p>
                ) : (
                    notifications.map((notif, index) => (
                        <div key={index} className="notif-card">
                            <p className="notif-text">{notif}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notification;


