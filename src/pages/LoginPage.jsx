import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/LoginPage.css";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await API.post("/login", { email, password });
            localStorage.setItem("token", response.data.token);
            API.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
            navigate("/main-page");
        } catch (err) {
            setError("Неверная почта или пароль");
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
                {error && <p className="error-message">{error}</p>}

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

                    {/* Добавлен текст "Забыли пароль?" */}
                    <p className="forgot-password" onClick={() => navigate("/forgot-password")}>
                        Забыли пароль?
                    </p>

                    <button type="submit" className="login-button">Войти</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
