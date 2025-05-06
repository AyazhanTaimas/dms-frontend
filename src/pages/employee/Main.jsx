// Main.jsx
import React from "react";
import "../../styles/employee/Main.css"; // Подключи файл стилей, если он есть

const Main = () => {
    return (
        <div className="main-container">
            <div className="welcome-box">
                <h2>Добро пожаловать в панель сотрудника!</h2>
                <p>Вы можете управлять заявками студентов.</p>
                <p>Перейдите во вкладку <strong>Заявки на ремонт</strong>.</p>
            </div>
        </div>
    );
};

export default Main;