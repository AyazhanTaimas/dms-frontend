import React, { useState } from "react";
import "../styles/student/ChangePasswordForPersonalInfo.css";
import API from "../api.js";


const ChangePasswordForAdmin = ({ onClose }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) {
            setError("Новый пароль и подтверждение не совпадают.");
            return;
        }

        try {
            const response = await API.post("/password", {
                old_password: oldPassword,
                new_password: newPassword,
                new_password_confirmation: confirmPassword,
            });

            setSuccess(response.data.message || "Пароль успешно изменён.");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Ошибка при изменении пароля.");
            }
        }
    };

    return (
        <div className="modal-container">
            <h2>Изменить пароль</h2>
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
                {success && <p className="success">{success}</p>}

                <div className="modal-buttons">
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={onClose}>Отмена</button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordForAdmin;
