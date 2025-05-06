import React, { useState } from "react";
import "../../styles/employee/RepairRequests.css";

const RepairRequests = () => {
    const [period, setPeriod] = useState("all");
    const [selectedRequest, setSelectedRequest] = useState(null);

    const requests = [
        {
            id: 1,
            title: "Починить кран",
            date: "2025-05-01",
            employee: "Иванов",
            status: "В процессе",
            type: "Сантехника",
            description: "Кран на кухне подтекает.",
            images: ["/photos/leak1.jpg", "/photos/leak2.jpg"]
        },
        {
            id: 2,
            title: "Замена лампы",
            date: "2025-04-28",
            employee: "Петров",
            status: "Завершено",
            type: "Электрика",
            description: "Лампочка в коридоре не горит.",
            images: ["/photos/lamp1.jpg"]
        }
    ];

    const handleStatusChange = (e) => {
        setSelectedRequest({ ...selectedRequest, status: e.target.value });
    };

    const closeModal = () => setSelectedRequest(null);

    return (
        <div className="repair-container">
            <h2>Все запросы</h2>

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

            <table className="repair-table">
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
                {requests.map((req, index) => (
                    <tr key={req.id} onClick={() => setSelectedRequest(req)} className="clickable-row">
                        <td>{index + 1}</td>
                        <td>{req.title}</td>
                        <td>{req.date}</td>
                        <td>{req.employee}</td>
                        <td>{req.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedRequest && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Детали запроса</h3>
                        <p><strong>Тип:</strong> {selectedRequest.type}</p>
                        <p><strong>Описание:</strong> {selectedRequest.description}</p>
                        <div className="modal-images">
                            {selectedRequest.images.map((src, i) => (
                                <img key={i} src={src} alt={`photo-${i}`} className="modal-img" />
                            ))}
                        </div>
                        <div className="modal-status">
                            <label>Изменить статус: </label>
                            <select value={selectedRequest.status} onChange={handleStatusChange}>
                                <option value="Ожидает">Ожидает</option>
                                <option value="В процессе">В процессе</option>
                                <option value="Завершено">Завершено</option>
                            </select>
                        </div>
                        <button onClick={closeModal}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RepairRequests;