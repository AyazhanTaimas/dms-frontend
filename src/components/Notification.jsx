import React from "react";
import "../styles/student/Notification.css";

const Notification = ({ isOpen, onClose, notifications = [] }) => {
    if (!isOpen) return null;

    console.log("Notifications:", notifications);

    return (
        <div className={`notification-sidebar ${isOpen ? "open" : ""}`}>
            <button className="close-btn-circle" onClick={onClose}>×</button>
            <h2 className="not">Уведомления</h2>

            <div className="notif-list">
                {notifications?.length === 0 ? (
                    <p className="empty-message">Нет новых уведомлений</p>
                ) : (
                    notifications.map((notif, index) => {
                        const currentDate = new Date();
                        const formattedDate = currentDate.toLocaleDateString();
                        const formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

                        return (
                            <div key={index} className="notif-card">
                                <p className="notif-text">{notif}</p>
                                <p className="notif-timestamp">{formattedDate} {formattedTime}</p>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Notification;
