import React, { useState } from "react";
import "../styles/student/AddRepairRequest.css";

const AddRepairRequest = ({ closeModal, addRequest }) => {
    const [formData, setFormData] = useState({
        requestId: "",
        description: "",
        status: "В ожидании",
        date: new Date().toISOString().slice(0, 16),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.requestId || !formData.description) {
            alert("Пожалуйста, заполните все поля!");
            return;
        }
        addRequest(formData);
        closeModal();
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <h3>Добавить новый запрос на ремонт</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="requestId">ID запроса</label>
                        <input
                            type="text"
                            id="requestId"
                            name="requestId"
                            value={formData.requestId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Описание</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Статус</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="В ожидании">В ожидании</option>
                            <option value="В процессе">В процессе</option>
                            <option value="Завершен">Завершен</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Дата и время</label>
                        <input
                            type="datetime-local"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="submit-button">Сохранить</button>
                        <button type="button" className="cancel-button" onClick={closeModal}>Отменить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRepairRequest;