import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserCard.css";

const UserCard = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login-page");
    };

    const handleProfileClick = () => {
        navigate("/personal-info"); // Перенаправляем в личный кабинет
        onClose(); // Закрываем карточку
    };

    return (
        <div className="user-card">
            <button className="close-btn" onClick={onClose}>✖</button>
            <img src="/user-icon.png" alt="User" className="user-avatar" />
            <h2 className="user-name">Аяжан Токанова</h2>
            <p className="user-status">Проживающий</p>
            <div className="user-actions">
                <button className="profile-btn" onClick={handleProfileClick}>Мой профиль</button>
                <button className="logout-btn" onClick={handleLogout}>
                    <img src="/logout.png" alt="Logout" className="logout-icon" />
                    Выйти
                </button>
            </div>
        </div>
    );
};

export default UserCard;









