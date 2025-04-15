import React, { useState } from "react";
import "../../styles/student/RepairRequest.css";
import HistoryRepair from "../../components/HistoryRepair.jsx";
import AddRepairRequest from "../../components/AddRepairRequest.jsx";

const RepairRequest = () => {
    const [selectedRequest, setSelectedRequest] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const requests = [
        { id: 1, status: "В ожидании", date: "2025-04-01 10:00" },
        { id: 2, status: "В процессе", date: "2025-03-30 14:30" },
        { id: 3, status: "Завершен", date: "2025-03-28 09:45" },
    ];

    const history = {
        1: [
            { id: 1, status: "Создан", date: "2025-04-01 09:00" },
            { id: 2, status: "В ожидании", date: "2025-04-01 10:00" },
        ],
        2: [
            { id: 1, status: "Создан", date: "2025-03-29 12:00" },
            { id: 2, status: "В процессе", date: "2025-03-30 14:30" },
        ],
        3: [
            { id: 1, status: "Создан", date: "2025-03-27 08:30" },
            { id: 2, status: "Завершен", date: "2025-03-28 09:45" },
        ],
    };

    const openModal = (requestId) => {
        setSelectedRequest(history[requestId] || []);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    return (
        <div className="repair-container">
            <div className="repair-header">
                <h2>Запросы на ремонт</h2>
                <button className="add-button" onClick={openAddModal}>+</button>
            </div>

            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Статус</th>
                    <th>Дата и время</th>
                </tr>
                </thead>
                <tbody>
                {requests.map((request) => (
                    <tr key={request.id} onClick={() => openModal(request.id)}>
                        <td>{request.id}</td>
                        <td>{request.status}</td>
                        <td>{request.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <HistoryRepair
                isOpen={isModalOpen}
                closeModal={closeModal}
                selectedRequest={selectedRequest}
            />

            {isAddModalOpen && <AddRepairRequest closeModal={closeAddModal} />}
        </div>
    );
};

export default RepairRequest;
