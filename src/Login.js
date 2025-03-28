import React, { useState } from 'react';
import { login } from './auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await login(email, password);
            console.log('Успешный вход:', user);
        } catch (error) {
            console.error('Ошибка входа:', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
            <button type="submit">Войти</button>
        </form>
    );
};

export default Login;
