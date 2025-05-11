import React, { useEffect, useState } from "react";
import "../../styles/manager/Accommodation.css";
import API from "../../api.js";

const Accommodation = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = () => {
        API.get("/manager/bookings")
            .then((res) => {
                setRequests(Array.isArray(res.data) ? res.data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Ошибка при загрузке заявок:", err);
                setRequests([]);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAccept = (id) => {
        API.post(`/manager/booking/accept/${id}`)
            .then(() => {
                setRequests(prev => prev.filter(req => req.id !== id));
            })
            .catch((err) => {
                console.error("Ошибка при принятии заявки:", err);
                alert("Ошибка при принятии. Возможно, комната уже заполнена.");
            });
    };

    const handleReject = (id) => {
        API.post(`/manager/booking/reject/${id}`)
            .then(() => {
                setRequests(prev => prev.filter(req => req.id !== id));
            })
            .catch((err) => {
                console.error("Ошибка при отклонении заявки:", err);
            });
    };

    return (
        <div className="accommodation-container">
            <h2 className="accommodation-title">Заявки на проживание</h2>

            <table className="accommodation-table">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Студент</th>
                    <th>Корпус</th>
                    <th>Этаж</th>
                    <th>Комната</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {loading ? (
                    <tr>
                        <td colSpan="6">Загрузка...</td>
                    </tr>
                ) : requests.length === 0 ? (
                    <tr>
                        <td colSpan="6">Нет заявок на рассмотрение.</td>
                    </tr>
                ) : (
                    requests.map((req, index) => (
                        <tr key={req.id}>
                            <td>{index + 1}</td>
                            <td>{req.user?.name ?? "Неизвестно"}</td>
                            <td>{req.building?.name ?? "-"}</td>
                            <td>{req.floor ?? "-"}</td>
                            <td>{req.room?.room_number ?? "-"}</td>
                            <td className="actions">
                                <button onClick={() => handleAccept(req.id)} className="accept-btn">Принять</button>
                                <button onClick={() => handleReject(req.id)} className="reject-btn">Отклонить</button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Accommodation;