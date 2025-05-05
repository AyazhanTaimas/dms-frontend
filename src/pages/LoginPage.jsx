import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../api"; // Твой файл с настройками API
import "../styles/student/LoginPage.css";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await API.get("/sanctum/csrf-cookie");

            const response = await API.post("/login", { email, password });

            console.log("Login successful:", response.data);

            localStorage.setItem("token", response.data.token);

            localStorage.setItem("user", JSON.stringify(response.data.user.username));

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
                <img src="/DMS.png" alt="DMS" className="dms-text" />
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

                    <p className="forgot-password" onClick={() => navigate("/forgot-password")}>
                        Забыли пароль?
                    </p>

                    <button type="submit" className="login-button">Войти</button>

                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
