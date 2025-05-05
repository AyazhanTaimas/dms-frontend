import { useEffect, useState } from "react";
import API from "../api.js"; // Путь до файла API.js
import "../styles/student/MainPage.css";

const MainPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get("/news")
            .then((res) => {
                console.log("Ответ от API:", res.data); // Проверка структуры ответа
                if (res.data && res.data.news) {
                    setNews(res.data.news); // Устанавливаем новости из ответа
                } else {
                    console.error("Нет поля 'news' в ответе.");
                }
                setLoading(false); // Заканчиваем загрузку
            })
            .catch((err) => {
                console.error("Ошибка при получении новостей:", err);
                setLoading(false); // Завершаем загрузку при ошибке
            });
    }, []); // Этот useEffect срабатывает только при монтировании компонента

    return (
        <main className="content">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="main-title">ГЛАВНОЕ ОБЪЯВЛЕНИЕ</h1>
            </div>

            <h2 className="news-heading">Новости</h2>

            {loading ? (
                <p>Загрузка новостей...</p>
            ) : (
                news.length > 0 ? (
                    news.map((item) => (
                        <section key={item.id} className="news-section">
                            <div className="news-text">
                                <h3 className="news-title">{item.title || "Без заголовка"}</h3>
                                <p className="text-gray-600">{item.content || "Нет содержимого"}</p>
                            </div>
                            <div className="news-image">
                                {item.image ? <img src={item.image} alt="News" /> : null}
                            </div>
                        </section>
                    ))
                ) : (
                    <p>Нет новостей для отображения.</p>
                )
            )}
        </main>
    );
};

export default MainPage;
