import React, { useState } from "react";
import "../styles/RepairRequest.css";

const repairRequests = [
    { id: 1, requestId: "REQ-001", date: "20.03.2025", employee: "Иван Петров", status: "В процессе", link: "#" },
    { id: 2, requestId: "REQ-002", date: "18.03.2025", employee: "Анна Смирнова", status: "Завершено", link: "#" },
    { id: 3, requestId: "REQ-003", date: "15.03.2025", employee: "Алексей Иванов", status: "Ожидает", link: "#" },
];

const requestTypes = [
    "Сантехник",
    "Электрик",
    "Сварщик",
    "Столяр",
    "Клининг",
    "Компьютерные работы",
];

const RepairRequests = () => {
    const [period, setPeriod] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newRequest, setNewRequest] = useState({
        type: "",
        description: "",
        file: null,
        time: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRequest({ ...newRequest, [name]: value });
    };

    const handleFileChange = (e) => {
        setNewRequest({ ...newRequest, file: e.target.files[0] });
    };

    const handleSubmit = () => {
        console.log("Отправлено:", newRequest);
        setIsModalOpen(false);
        setNewRequest({ type: "", description: "", file: null, time: "" });
    };

    return (
        <div className="repair-container">
            <div className="repair-header">
                <h2>Запросы на ремонт</h2>
                <button className="add-button" onClick={() => setIsModalOpen(true)}>+</button>
            </div>

            {/* Выбор периода */}
            <div className="period-section">
                <select
                    className="period-select"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                >
                    <option value="">Выбрать период</option>
                    <option value="last3">Последние 3 месяца</option>
                    <option value="last6">Последние 6 месяцев</option>
                    <option value="last12">Последний год</option>
                </select>
            </div>

            {/* Таблица запросов */}
            <table className="requests-table">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Запрос</th>
                    <th>Дата</th>
                    <th>Сотрудник</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {repairRequests.map((request, index) => (
                    <tr key={request.id}>
                        <td>{index + 1}</td>
                        <td>
                            <a href={request.link} className="request-link">{request.requestId}</a>
                        </td>
                        <td>{request.date}</td>
                        <td>{request.employee}</td>
                        <td>{request.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Всплывающее окно создания запроса */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Новый запрос на ремонт</h3>

                        <label>Тип проблемы:</label>
                        <select
                            name="type"
                            value={newRequest.type}
                            onChange={handleChange}
                        >
                            <option value="">Выберите тип запроса</option>
                            {requestTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>

                        <label>Опишите проблему:</label>
                        <textarea
                            name="description"
                            value={newRequest.description}
                            onChange={handleChange}
                            placeholder="Подробно опишите проблему"
                        ></textarea>

                        <label>Прикрепить файлы:</label>
                        <input type="file" onChange={handleFileChange} />

                        <label>Выбрать время сотрудника:</label>
                        <input
                            type="datetime-local"
                            name="time"
                            value={newRequest.time}
                            onChange={handleChange}
                        />

                        <div className="modal-buttons">
                            <button className="submit-button" onClick={handleSubmit}>Отправить</button>
                            <button className="cancel-button" onClick={() => setIsModalOpen(false)}>Отменить</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RepairRequests;
