import React, { useEffect, useState } from "react";
import "../../styles/employee/RepairRequests.css";
import API from "../../api";

const RepairRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        API.get("/employee/requests/employee")
            .then((res) => {
                console.log("Ответ от сервера:", res.data);
                setRequests(Array.isArray(res.data.data) ? res.data.data : []);
            })
            .catch((err) => {
                console.error("Ошибка при загрузке запросов:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        if (selectedRequest) {
            API.put(`/employee/requests/${selectedRequest.id}/status`, { status: newStatus })
                .then(() => {
                    setRequests(prev =>
                        prev.map(req =>
                            req.id === selectedRequest.id
                                ? { ...req, status: newStatus }
                                : req
                        )
                    );
                    setSelectedRequest({ ...selectedRequest, status: newStatus });
                })
                .catch((err) => {
                    console.error("Ошибка при обновлении статуса:", err);
                });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const closeModal = () => setSelectedRequest(null);

    return (
        <div className="repair-container">
            <h2>Мои заявки на ремонт</h2>

            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <table className="repair-table">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Тип</th>
                        <th>Описание</th>
                        <th>Дата</th>
                        <th>Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.map((req, index) => (
                        <tr
                            key={req.id}
                            onClick={() => setSelectedRequest(req)}
                            className="clickable-row"
                        >
                            <td>{index + 1}</td>
                            <td>{req.type}</td>
                            <td>{req.description || "Нет описания"}</td>
                            <td>{formatDate(req.updated_at)}</td>
                            <td>{req.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {selectedRequest && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Детали запроса</h3>
                        <p><strong>Тип:</strong> {selectedRequest.type}</p>
                        <p><strong>Статус:</strong> {selectedRequest.status}</p>
                        <p><strong>Описание:</strong> {selectedRequest.description || "Нет описания"}</p>

                        {selectedRequest.file && (
                            <div className="modal-image">
                                <p><strong>Фото:</strong></p>
                                <img
                                    src={`http://localhost:8000/storage/${selectedRequest.file}`}
                                    alt="Приложение"
                                    style={{
                                        width: "300px",
                                        height: "auto",
                                        borderRadius: "8px",
                                        marginTop: "10px",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                                    }}                                />
                            </div>
                        )}

                        <div className="modal-status">
                            <label>Изменить статус: </label>
                            <select value={selectedRequest.status} onChange={handleStatusChange}>
                                <option value="На рассмотрении">На рассмотрении</option>
                                <option value="Принято">Принято</option>
                                <option value="Выполнено">Выполнено</option>
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
