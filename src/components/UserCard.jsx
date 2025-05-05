import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/student/UserCard.css";
import API from "../api.js";

const UserCard = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            API.get("/student/name")
                .then((response) => {
                    setName(response.data.name);
                    setPhoto(response.data.photo); // <- добавили фото
                })
                .catch((error) => {
                    console.error("Ошибка при получении имени:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const handleProfileClick = () => {
        navigate("/personal-info");
        onClose();
    };

    return (
        <div className="user-card">
            <button className="close-btn" onClick={onClose}>✖</button>

            <img
                src={photo || "/user-icon.png"} // Показываем фото, если оно есть
                alt="User"
                className="user-avatar"
            />

            {loading ? (
                <h2 className="user-name">Загрузка...</h2>
            ) : (
                <h2 className="user-name">{name || "Пользователь не найден"}</h2>
            )}

            <div className="user-actions">
                <button className="profile-btn" onClick={handleProfileClick}>
                    Мой профиль
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                    <img src="/logout.png" alt="Logout" className="logout-icon" />
                    Выйти
                </button>
            </div>
        </div>
    );
};

export default UserCard;
