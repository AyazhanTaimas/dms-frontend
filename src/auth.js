import API from './api';

// Функция для входа
export const login = async (email, password) => {
    try {
        const response = await API.post('/login', { email, password });

        // Сохраняем токен
        localStorage.setItem('token', response.data.token);

        // Устанавливаем заголовок для всех запросов
        API.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        return response.data;
    } catch (error) {
        console.error('Ошибка авторизации:', error);
        throw error;
    }
};

// Функция для получения текущего пользователя
export const getCurrentUser = async () => {
    try {
        const response = await API.get('/user');
        return response.data;
    } catch (error) {
        console.error('Ошибка получения пользователя:', error);
        return null;
    }
};
