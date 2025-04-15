import React from "react";
import "../styles/student/HistoryRepair.css";

const HistoryRepair = ({ isOpen, closeModal, selectedRequest }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-btn" onClick={closeModal}>×</button>
                <h2 className="modal-title">История запроса</h2>
                <table className="history-table">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Статус</th>
                        <th>Дата и время</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedRequest.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.status}</td>
                            <td>{item.date}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <a href="#" className="repeat-request">
                    Проблема не решена? Повторить заявку
                </a>
            </div>
        </div>
    );
};

export default HistoryRepair;
