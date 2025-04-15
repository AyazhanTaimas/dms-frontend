import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "../../styles/student/ForgotPassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleReset = () => {
        if (email.trim() === "") {
            setMessage("Введите вашу почту.");
            return;
        }
        setMessage("Инструкция по восстановлению отправлена на почту.");
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <a href="/public" className="back-button">
                    <FaArrowLeft /> Назад
                </a>
                <h2>Восстановление пароля</h2>
                <label htmlFor="email">Почта</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Введите вашу почту"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {message && <p className="message">{message}</p>}
                <button className="reset-password-button" onClick={handleReset}>Отправить</button>
            </div>
        </div>
    );
};

export default ForgotPassword;
