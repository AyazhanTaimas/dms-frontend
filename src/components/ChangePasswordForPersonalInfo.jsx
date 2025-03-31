import React, { useState } from "react";
import "../styles/ChangePasswordForPersonalInfo.css";

const ChangePasswordModal = ({ onClose }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Новый пароль и подтверждение не совпадают");
            return;
        }
        // Логика смены пароля (можно добавить API-запрос)
        console.log("Пароль изменён:", { oldPassword, newPassword });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Измененить пароль</h2>
                <form onSubmit={handleSubmit}>
                    <label>Старый пароль</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />

                    <label>Новый пароль</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />

                    <label>Повторите новый пароль</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    {error && <p className="error">{error}</p>}

                    <div className="modal-buttons">
                        <button type="submit">Сохранить</button>
                        <button type="button" onClick={onClose}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
