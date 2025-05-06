// AddUsers.jsx
import React from "react";
import "../styles/admin/AddUsers.css";

const AddUsers = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Новый пользователь</h2>
                <form className="modal-form">
                    <label>ID</label>
                    <input type="text" placeholder="Введите ID" />

                    <label>Статус</label>
                    <input type="text" placeholder="Введите статус" />

                    <label>ФИО</label>
                    <input type="text" placeholder="Введите ФИО" />

                    <label>Email</label>
                    <input type="email" placeholder="Введите E-mail" />

                    <label>Пароль</label>
                    <input type="password" placeholder="Введите пароль" />

                    <div className="modal-buttons">
                        <button type="submit" className="save-button">Сохранить</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUsers;
