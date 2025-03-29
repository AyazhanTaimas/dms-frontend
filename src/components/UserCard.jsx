import React from "react";
import { useNavigate } from "react-router-dom"; // Импорт хука для навигации
import "../styles/UserCard.css";

const UserCard = ({ isOpen, onClose }) => {
    const navigate = useNavigate(); // Создаём объект навигации

    if (!isOpen) return null;

    const handleLogout = () => {
        console.log("Выход из системы...");
        localStorage.removeItem("token");
        navigate("/login-page"); // Перенаправляем на страницу входа
    };

    return (
        <div className="user-card">
            <button className="close-btn-circle" onClick={onClose}>×</button>
            <img src="/user-icon.png" alt="User" className="user-photo" />
            <p className="user-name">Аяжан Токанова</p>
            <div className="user-actions">
                <button className="profile-btn">Мой профиль</button>
                <button className="logout-btn" onClick={handleLogout}>
                    <img src="/logout.png" alt="Logout" className="logout-icon" />
                    Выйти
                </button>
            </div>
        </div>
    );
};

export default UserCard;





