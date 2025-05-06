import React from "react";
import "../styles/AddNews.css";

const AddNews = ({ newNews, handleChange, handleAddNews, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Новая новость</h2>
                <div className="form-container">
                    <div className="form-group">
                        <label>Заголовок</label>
                        <input
                            type="text"
                            name="title"
                            value={newNews.title}
                            onChange={handleChange}
                            placeholder="Введите заголовок новости"
                        />
                    </div>

                    <div className="form-group">
                        <label>Тема</label>
                        <input
                            type="text"
                            name="topic"
                            value={newNews.topic || ""}
                            onChange={handleChange}
                            placeholder="Введите тему новости"
                        />
                    </div>

                    <div className="form-group">
                        <label>Текст</label>
                        <textarea
                            name="text"
                            value={newNews.text || ""}
                            onChange={handleChange}
                            placeholder="Введите текст новости"
                        />
                    </div>

                    <div className="form-group">
                        <label>Прикрепить файл</label>
                        <input type="file" />
                    </div>
                </div>

                <div className="modal-buttons">
                    <button onClick={handleAddNews}>Добавить</button>
                    <button onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default AddNews;