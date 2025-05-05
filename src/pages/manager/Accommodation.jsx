import React from "react";
import "../../styles/manager/Accommodation.css"; // создайте файл стилей при необходимости

const accommodationRequests = [
    {
        id: 1,
        request: 1235,
        student: "Айбекова Алия",
        building: "1",
        floor: "3",
        room: "312",
        documents: "Документ.pdf"
    },
    {
        id: 2,
        request: 123456,
        student: "Нурланов Тимур",
        building: "2",
        floor: "2",
        room: "205",
        documents: "Документ.pdf"
    }
];

const Accommodation = () => {
    const handleAccept = (id) => {
        console.log(`Заявка №${id} принята`);
        // здесь можно отправить PUT/POST запрос
    };

    const handleReject = (id) => {
        console.log(`Заявка №${id} отклонена`);
        // здесь можно отправить PUT/POST запрос
    };

    return (
        <div className="accommodation-container">
            <h2 className="accommodation-title">Заявки на проживание</h2>

            <div className="accommodation-table-header">
                <div>№</div>
                <div>Запрос</div>
                <div>Студент</div>
                <div>Корпус</div>
                <div>Этаж</div>
                <div>Комната</div>
                <div>Документы</div>
                <div>Действия</div>
            </div>

            {accommodationRequests.map((req) => (
                <div key={req.id} className="accommodation-table-row">
                    <div>{req.id}</div>
                    <div>{req.request}</div>
                    <div>{req.student}</div>
                    <div>{req.building}</div>
                    <div>{req.floor}</div>
                    <div>{req.room}</div>
                    <div>
                        <a href={`/${req.documents}`} download>
                            Перейти
                        </a>
                    </div>
                    <div className="actions">
                        <button onClick={() => handleAccept(req.id)} className="accept-btn">Принять</button>
                        <button onClick={() => handleReject(req.id)} className="reject-btn">Отклонить</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accommodation;