import { useEffect, useState } from "react";
import API from "../api";
import AddNews from "../components/AddNews.jsx";
import "../styles/News.css";

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newsToEdit, setNewsToEdit] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = () => {
        API.get("/news")
            .then((res) => {
                if (res.data && res.data.news) {
                    setNews(res.data.news);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Ошибка при получении новостей:", err);
                setLoading(false);
            });
    };

    const addNews = (newItem) => {
        setNews((prevNews) => [newItem, ...prevNews]);
    };

    const updateNews = (updatedItem) => {
        setNews((prevNews) =>
            prevNews.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
            )
        );
    };

    const deleteNews = (id) => {
        API.delete(`/manager/news/${id}`)
            .then(() => {
                setNews((prevNews) => prevNews.filter((item) => item.id !== id));
            })
            .catch((err) => {
                console.error("Ошибка при удалении новости:", err);
                alert("Не удалось удалить новость.");
            });
    };

    const handleNewsClick = (item) => {
        setNewsToEdit(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewsToEdit(null);
    };

    return (
        <div className="news-page-container">
            <div className="news-header">
                <h2>Список новостей</h2>
                <button className="add-news-button" onClick={() => setIsModalOpen(true)}>+</button>
            </div>

            {loading ? (
                <p>Загрузка новостей...</p>
            ) : news.length > 0 ? (
                <div className="news-table">
                    <div className="news-table-header">
                        <div>ID</div>
                        <div>Заголовок</div>
                        <div>Дата</div>
                        <div>Действия</div>
                    </div>
                    {news.map((item) => (
                        <div key={item.id} className="news-table-row">
                            <div>{item.id}</div>
                            <div
                                onClick={() => handleNewsClick(item)}
                                style={{ cursor: "pointer", flex: 1 }}
                            >
                                {item.title}
                            </div>
                            <div>{item.updated_at ? new Date(item.updated_at).toLocaleString('ru-RU') : "—"}</div>
                            <div>
                                <button
                                    className="delete-button"
                                    onClick={() => {
                                        if (window.confirm("Вы уверены, что хотите удалить новость?")) {
                                            deleteNews(item.id);
                                        }
                                    }}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Нет новостей для отображения.</p>
            )}

            {isModalOpen && (
                <AddNews
                    addNews={addNews}
                    updateNews={updateNews}
                    newsToEdit={newsToEdit}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default News;
