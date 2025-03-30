import React, { useState } from "react";
import "../styles/ChangePassword.css";

const ChangePassword = ({ onClose }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Пароли не совпадают!");
            return;
        }
        alert("Пароль успешно изменён!");
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Смена пароля</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Новый пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Подтвердите пароль</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="submit" className="button save">Сохранить</button>
                        <button type="button" className="button close" onClick={onClose}>Закрыть</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
