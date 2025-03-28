import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/LoginPage.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (

        <div className="login-container">
            <div className="login-box">
                  <img src="/logo.png" alt="Logo" className="logo" />
                <h2>Войти в аккаунт</h2>

                <label htmlFor="email">Почта</label>
                <input type="email" id="email" placeholder="Введите почту" />

                <label htmlFor="password">Пароль</label>
                <div className="password-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Введите пароль"
                    />
                    <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
                </div>

                <Link to="/forgot-password" className="forgot-password">Забыли пароль?</Link>
                <Link to="/main-page" className="login-button">Войти</Link>
            </div>
        </div>
    );
};

export default LoginPage;