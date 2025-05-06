import React, { useState } from "react";
import "../styles/News.css";
import AddNews from "../components/AddNews.jsx";

const News = () => {
    const [newsList, setNewsList] = useState([
        { id: 1, title: "Обновление платформы", author: "Админ", date: "2025-05-01" }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);


    const [newNews, setNewNews] = useState({
        id: "",
        title: "",
        author: "",
        date: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewNews((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddNews = () => {
        if (newNews.id && newNews.title && newNews.author && newNews.date) {
            setNewsList((prev) => [...prev, newNews]);
            setNewNews({ id: "", title: "", author: "", date: "" });
        }
    };

    return (
        <div className="news-page-container">
            <div className="news-header">
                <h2>Список новостей</h2>
                <button className="add-news-button" onClick={() => setIsModalOpen(true)}>+</button>
            </div>

            <div className="news-inputs">
                <div className="input-group">
                    <label>ID</label>
                    <input type="text" name="id" value={newNews.id} onChange={handleChange}/>
                </div>
                <div className="input-group">
                    <label>Тема</label>
                    <input type="text" name="title" value={newNews.title} onChange={handleChange}/>
                </div>
                <div className="input-group">
                    <label>Автор</label>
                    <input type="text" name="author" value={newNews.author} onChange={handleChange}/>
                </div>
                <div className="input-group">
                    <label>Дата</label>
                    <input type="date" name="date" value={newNews.date} onChange={handleChange}/>
                </div>
            </div>

            <div className="news-table">

                {newsList.map((news) => (
                    <div key={news.id} className="news-table-row">
                        <div>{news.id}</div>
                        <div>{news.title}</div>
                        <div>{news.author}</div>
                        <div>{news.date}</div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <AddNews
                    newNews={newNews}
                    handleChange={handleChange}
                    handleAddNews={handleAddNews}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

        </div>
    );
};

export default News;

