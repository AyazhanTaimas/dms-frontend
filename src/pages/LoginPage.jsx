import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../api"; // Твой файл с настройками API
import "../styles/student/LoginPage.css";
import { useUser } from "../context/UserContext"; // Импортируй useUser



const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { updateRole } = useUser(); // Получи функцию обновления роли



    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await API.get("/sanctum/csrf-cookie"); // Получение CSRF токена для безопасности

            const response = await API.post("/login", { email, password });

            console.log("Login successful:", response.data);

            // Сохранение данных в localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user.username));
            localStorage.setItem("role", response.data.user.role);


            updateRole(response.data.user.role); // Обновление контекста


            // Перенаправление на главную страницу после успешного логина
            navigate("/main-page");
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Неверная почта или пароль");
            } else {
                setError("Ошибка сервера");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="logo-container">
                <img src="/logo.png" alt="Logo" className="logo" />
                <img src="/DMS%20(1).svg" alt="DMS" className="dms-text" />
            </div>

            <div className="login-box">
                <h2>Войти в аккаунт</h2>

                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Почта</label>
                    <input
                        type="email"
                        id="email"
                        className="input-field"
                        placeholder="Введите почту"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Пароль</label>
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>


                    <button type="submit" className="login-button">Войти</button>

                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
