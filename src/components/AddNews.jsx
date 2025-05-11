import React, { useEffect, useState } from "react";
import "../styles/AddNews.css";
import API from "../api";

const AddNews = ({ onClose, addNews, updateNews, newsToEdit }) => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: null,
    });

    useEffect(() => {
        if (newsToEdit) {
            setFormData({
                title: newsToEdit.title || "",
                content: newsToEdit.content || "",
                image: null, // не передаём файл сюда, только при замене
            });
        }
    }, [newsToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            image: file,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.content) {
            alert("Пожалуйста, заполните все обязательные поля.");
            return;
        }

        const dataToSend = new FormData();
        dataToSend.append("title", formData.title);
        dataToSend.append("content", formData.content);
        if (formData.image) {
            dataToSend.append("image", formData.image);
        }

        const method = newsToEdit ? "put" : "post";
        const url = newsToEdit ? `/news/${newsToEdit.id}` : "/manager/news";

        API[method](url, dataToSend)
            .then((response) => {
                const updatedNews = response.data.news;
                if (newsToEdit && updateNews) {
                    updateNews(updatedNews);
                } else if (addNews) {
                    addNews(updatedNews);
                }
                onClose();
            })
            .catch((error) => {
                console.error("Ошибка при сохранении новости:", error);
                alert("Произошла ошибка при сохранении новости.");
            });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">
                    {newsToEdit ? "Редактировать новость" : "Добавить новость"}
                </h2>
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <label>Заголовок</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Введите заголовок"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Содержимое</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Введите текст новости"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Изображение</label>
                        <input type="file" name="image" onChange={handleFileChange} />
                    </div>

                    <div className="modal-buttons">
                        <button type="submit" className="submit-button">
                            {newsToEdit ? "Сохранить изменения" : "Добавить"}
                        </button>
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Отменить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNews;
