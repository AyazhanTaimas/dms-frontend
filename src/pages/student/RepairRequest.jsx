import React, { useState, useEffect } from "react";
import "../../styles/student/RepairRequest.css";
import AddRepairRequest from "../../components/AddRepairRequest.jsx";
import API from "../../api.js";
import HistoryRepair from "../../components/HistoryRepair.jsx";

const RepairRequest = () => {
    const [requests, setRequests] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchRequests = () => {
        setLoading(true);
        API.get("/student/requests")
            .then((res) => {
                console.log("Ответ от API:", res.data); // 👈 сюда
                const data = res.data.data;
                const formatted = data.map((item, index) => ({
                    id: index + 1,
                    description: item.type,
                    employee: item.employee || "—",
                    status: item.status,
                    date: item.updated_at,
                }));
                setRequests(formatted);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке запросов:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);
    const handleAddRequest = () => {
        fetchRequests();
        closeAddModal();
    };

    return (
        <div className="repair-container">
            <div className="repair-header">
                <h2>Запросы на ремонт</h2>
                <button className="add-button" onClick={openAddModal}>+</button>
            </div>

            {loading ? (
                <p>Загрузка запросов...</p>
            ) : (
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
                    {requests.map((request) => (
                        <tr key={request.id}>
                            <td>{request.id}</td>
                            <td>{request.description}</td>
                            <td>{request.date}</td>
                            <td>{request.employee}</td>
                            <td>{request.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {isAddModalOpen && (
                <AddRepairRequest
                    closeModal={closeAddModal}
                    addRequest={handleAddRequest}
                />
            )}
        </div>
    );
};

export default RepairRequest;
