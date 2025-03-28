import axios from 'axios';

// Создание клиента API
const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Базовый URL для API Laravel
});

// Добавляем токен, если он есть в LocalStorage
const token = localStorage.getItem('token');
if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default API;
