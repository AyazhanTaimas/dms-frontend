import React, { useState } from "react";
import "../styles/student/PersonalInfo.css";
import ChangePasswordForPersonalInfo from "./ChangePasswordForPersonalInfo.jsx";

const UsersInformation = () => {
    const [email, setEmail] = useState("a_tokanova@kbtu.kz");
    const [phone, setPhone] = useState("87071711204");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = () => {
        // Здесь можно добавить отправку данных на сервер
        alert("Изменения сохранены");
    };

    const handleViewDocs = () => {
        // Здесь можно реализовать просмотр документов
        alert("Здесь будет просмотр документов");
    };

    return (
        <div className="personal-info-container">
            <h2 className="personal-info-header">Личные данные</h2>

            <div className="personal-info-content">
                <img
                    src="/avatar.png"
                    alt="User"
                    className="personal-info-avatar"
                />
                <div className="personal-info-details">
                    <h3 className="personal-info-name">Токанова Аяжан</h3>
                    <p className="personal-info-status">
                        Статус: Проживающий <br />
                        Корпус 1, этаж 2, комната 14Б
                    </p>
                </div>
            </div>

            <div className="personal-info-fields">
                <div className="personal-info-field">
                    <label>ID</label>
                    <input
                        type="text"
                        value="21B030931"
                        className="personal-info-input"
                        readOnly
                    />
                </div>

                <div className="personal-info-field">
                    <label>Номер телефона</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="personal-info-input"
                    />
                </div>
            </div>

            <div className="personal-info-fields">
                <div className="personal-info-field">
                    <label>E-Mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="personal-info-input"
                    />
                </div>

                <div className="personal-info-password">
                    <label>Пароль</label>
                    <button
                        className="personal-info-password-btn"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Изменить
                    </button>
                </div>
            </div>

            <div className="personal-info-fields">
                <div className="personal-info-field">
                    <label>Документы</label>
                    <button
                        className="personal-info-view-docs-btn"
                        onClick={handleViewDocs}
                    >
                        Просмотреть
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <ChangePasswordForPersonalInfo
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            <button
                className="personal-info-save-btn"
                onClick={handleSave}
            >
                Сохранить изменения
            </button>
        </div>
    );
};

export default UsersInformation;