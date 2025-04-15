import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/student/UserCard.css";
import API from "../api.js";

const UserCard = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Добавлено состояние загрузки

    useEffect(() => {
        if (isOpen) {
            // Получаем данные пользователя из localStorage
            const storedUser = localStorage.getItem("user");

            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    if (parsedUser) {
                        setUser(parsedUser); // Устанавливаем данные пользователя
                    } else {
                        console.error("Данные пользователя не содержат необходимые поля");
                    }
                } catch (error) {
                    console.error("Ошибка при парсинге данных пользователя:", error);
                }
            } else {
                console.error("Пользователь не найден в localStorage");
            }
            setLoading(false); // Заканчиваем загрузку
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Функция для выхода
    const handleLogout = async () => {
        try {
            // Очистка локального хранилища и заголовков
            localStorage.removeItem("user");
            localStorage.removeItem("token");

            // Перенаправление на страницу логина
            window.location.href = "/";
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    };

    // Переход в профиль
    const handleProfileClick = () => {
        navigate("/personal_info");
        onClose();
    };

    return (
        <div className="user-card">
            <button className="close-btn" onClick={onClose}>✖</button>
            <img src="/user-icon.png" alt="User" className="user-avatar" />
            {loading ? (
                <h2 className="user-name">Загрузка...</h2>
            ) : (
                <h2 className="user-name">{user ? user.username : "Пользователь не найден"}</h2>
                )}
            <p className="user-status">{user ? "Проживающий" : ""}</p>
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
