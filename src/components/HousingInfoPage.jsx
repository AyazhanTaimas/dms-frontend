import React, { useEffect, useState } from "react";
import API from "../api.js";

const HousingInfoPage = () => {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        API.get("/student/housing-info")
            .then((res) => {
                setInfo(res.data);
            })
            .catch((err) => {
                console.error("Ошибка при получении информации о проживании", err);
            });
    }, []);

    if (!info) return <div>Загрузка...</div>;

    return (
        <div className="housing-info-container">
            <h1>Информация о проживании</h1>
            <p><strong>Корпус:</strong> {info.building.name}</p>
            <p><strong>Этаж:</strong> {info.floor}</p>
            <p><strong>Комната:</strong> {info.room.room_number}</p>
        </div>
    );
};

export default HousingInfoPage;
